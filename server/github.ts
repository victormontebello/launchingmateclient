import { Octokit } from '@octokit/rest';

if (!process.env.GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN is required");
}

if (!process.env.GITHUB_TEMPLATE_REPO) {
  throw new Error("GITHUB_TEMPLATE_REPO is required");
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface CreateRepoFromTemplateParams {
  customerName: string;
  customerEmail: string;
  planName: string;
  userName?: string;
}

function getTemplateRepoByPlan(planName: string): string {
  switch (planName.toUpperCase()) {
    case 'STARTER':
      return process.env.GITHUB_TEMPLATE_REPO!;
    case 'PRO':
      return process.env.GITHUB_TEMPLATE_REPOPRO!;
    case 'ULTIMATE':
      return process.env.GITHUB_TEMPLATE_REPOULTIMATE!;
    default:
      return process.env.GITHUB_TEMPLATE_REPOULTIMATE!;
  }
}

export async function createRepoFromTemplate({
  customerName,
  customerEmail,
  planName,
  userName,
}: CreateRepoFromTemplateParams) {
  try {
    const templateRepoEnv = getTemplateRepoByPlan(planName);
    const [templateOwner, templateRepo] = templateRepoEnv.split('/');
    
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14); // AAAAMMDDHHMMSS
    const repoName = `${customerName.toLowerCase().replace(/\s+/g, '-')}-${planName.toLowerCase()}-project-${timestamp}`;

    const response = await octokit.repos.createUsingTemplate({
      template_owner: templateOwner,
      template_repo: templateRepo,
      owner: templateOwner,
      name: repoName,
      private: true,
      description: `Project ${planName} created for ${customerName} (${customerEmail})`,
      include_all_branches: false,
    });

    if (userName) {
      try {
        await octokit.repos.addCollaborator({
          owner: templateOwner,
          repo: repoName,
          username: userName,
          permission: 'admin',
        });
      } catch (collabError: any) {
        console.warn('Could not add customer as collaborator:', collabError.message);
      }
    }

    // Create welcome issue
    await octokit.issues.create({
      owner: templateOwner,
      repo: repoName,
      title: `🎉 Welcome to your ${planName} project!`,
      body: `Hello ${customerName}!

Congratulations on acquiring the **${planName}** plan!

## 🚀 Next steps:

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/${templateOwner}/${repoName}.git
   cd ${repoName}
   \`\`\`

2. **Configure environment variables:**
   - Copy the .env.example\` file to .env\`
   - Set your Stripe, Supabase, etc. keys

3. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

4. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

## 📚 Documentation:
- [Setup Guide](./docs/SETUP.md)
- [API Reference](./docs/API.md)
- [Deploy Guide](./docs/DEPLOY.md)

## 🆘 Support:
- Discord: [Server link]
- Email: support@launchingmate.com
- GitHub Issues: For bugs and improvements

Good luck with your project! 🎯`,
      labels: ['welcome', 'setup'],
    });

    return {
      success: true,
      repoUrl: response.data.html_url,
      repoName: response.data.name,
      cloneUrl: response.data.clone_url,
      owner: templateOwner,
    };
  } catch (error: any) {
    console.error('Error creating repository from template:', error);
    throw new Error(`Failed to create repository: ${error.message}`);
  }
}

export async function getCustomerGitHubUsername(email: string): Promise<string | null> {
  try {
    // Primeiro, tenta buscar o usuário pelo email
    const response = await octokit.search.users({
      q: email,
    });

    if (response.data.items.length > 0) {
      // Verifica se o email corresponde
      for (const user of response.data.items) {
        if (user.email === email) {
          return user.login;
        }
      }
      // Se não encontrar email exato, retorna o primeiro resultado
      return response.data.items[0].login;
    }

    // Se não encontrar pelo email, tenta extrair username do email
    const emailUsername = email.split('@')[0];
    
    // Verifica se o username existe
    try {
      const userResponse = await octokit.users.getByUsername({
        username: emailUsername,
      });
      return userResponse.data.login;
    } catch {
      // Se o username não existir, retorna null
      return null;
    }

  } catch (error) {
    console.error('Error fetching GitHub username:', error);
    return null;
  }
}

// Função para verificar se um usuário existe no GitHub
export async function checkUserExists(username: string): Promise<boolean> {
  try {
    await octokit.users.getByUsername({ username });
    return true;
  } catch {
    return false;
  }
} 