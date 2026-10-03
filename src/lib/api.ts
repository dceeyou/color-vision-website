const API_URL = process.env.WORDPRESS_API_URL || 'https://placeholder.wp.endpoint/graphql';

/**
 * Utility function to execute GraphQL queries against the Headless WordPress backend.
 */
async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' };
  
  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    // Authentication header logic here if needed for draft previews
  }

  // If the API URL is still the placeholder, we'll return mock data for development
  if (API_URL === 'https://placeholder.wp.endpoint/graphql') {
    return getMockData(query);
  }

  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

/**
 * Fetches all portfolio projects to populate the "Work" grid on the homepage.
 */
export async function getAllProjects() {
  const data = await fetchAPI(`
    query AllProjects {
      projects(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            slug
            projectFields {
              category
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
  `);
  return data?.projects?.edges || [];
}

// -------------------------------------------------------------
// Development Mock Data
// This is used to populate the UI while you set up WordPress!
// -------------------------------------------------------------
function getMockData(query: string) {
  return {
    projects: {
      edges: [
        {
          node: {
            id: '1',
            title: 'Aura FinTech',
            slug: 'aura-fintech',
            projectFields: { category: 'Brand / UI/UX', featuredImage: null }
          }
        },
        {
          node: {
            id: '2',
            title: 'Nexus System',
            slug: 'nexus-system',
            projectFields: { category: 'Product / Web', featuredImage: null }
          }
        },
        {
          node: {
            id: '3',
            title: 'Horizon Ventures',
            slug: 'horizon-ventures',
            projectFields: { category: 'Strategy / Brand', featuredImage: null }
          }
        }
      ]
    }
  };
}
