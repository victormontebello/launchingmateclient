import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import express from "express";
import { createRepoFromTemplate } from "./github";
// Removido: lógica de customer

declare module "express-serve-static-core" {
  interface Request {
    userid?: string;
  }
}

if (!process.env.VITE_STRIPE_SK) {
  throw new Error("VITE_STRIPE_SK is required");
}

const stripe = new Stripe(process.env.VITE_STRIPE_SK, {
  apiVersion: "2025-06-30.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {

  app.post("/api/create-checkout-session", async (req: Request, res: Response) => {
    try {
      const { priceId, userId, email, planName } = req.body;
      if (!priceId || !userId || !planName) {
        return res.status(400).json({ message: "Missing priceId, userId or planName" });
      }
      // URLs para redirecionamento
      const successUrl = `${req.headers.origin}/success?user_id=${userId}&email=${encodeURIComponent(email)}&plan=${encodeURIComponent(planName)}`;
      const cancelUrl = `${req.headers.origin}/pricing`;
      // Cria a sessão de checkout Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        customer_email: email,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId,
          planName,
        },
      });
      res.json({ sessionId: session.id });
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      return res.status(500).json({ message: error.message });
    }
  });

  // Webhook removido: lógica de customer não é mais usada

  // Endpoints de customer removidos

  // Endpoint para testar configuração do GitHub
  app.post("/api/test-github", async (req: Request, res: Response) => {
    try {
      const { email, username } = req.body;
      
      if (!email && !username) {
        return res.status(400).json({ message: "Email ou username é obrigatório" });
      }

      const { getCustomerGitHubUsername, checkUserExists } = await import("./github");
      
      let result: any = {};

      if (email) {
        const foundUsername = await getCustomerGitHubUsername(email);
        result.email = email;
        result.foundUsername = foundUsername;
        result.userExists = foundUsername ? await checkUserExists(foundUsername) : false;
      }

      if (username) {
        const userExists = await checkUserExists(username);
        result.username = username;
        result.userExists = userExists;
      }

      res.json({
        success: true,
        result,
        message: "Teste de configuração GitHub concluído"
      });
    } catch (error: any) {
      console.error("Erro ao testar GitHub:", error);
      return res.status(500).json({ message: error.message });
    }
  });

  // Endpoint de teste de customer removido

  app.post("/api/create-repository", async (req: Request, res: Response) => {
    try {
      const { email, planName, customerName, userName } = req.body;
      if (!email || !planName) {
        return res.status(400).json({ message: "Missing required fields: email, planName" });
      }
      // Cria o repositório no GitHub
      console.log('Criando repositório para:', email);
      const repoResult = await createRepoFromTemplate({
        customerName: customerName || email.split('@')[0],
        customerEmail: email,
        planName,
        userName: userName || undefined,
      });
      console.log('Repositório criado com sucesso:', repoResult.repoUrl);
      res.json({
        success: true,
        repoResult,
        message: "Repositório criado com sucesso"
      });
    } catch (error: any) {
      console.error("Erro ao criar repositório:", error);
      return res.status(500).json({ 
        message: error.message,
        success: false 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
