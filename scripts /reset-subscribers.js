const { createClient } = require('next-sanity');

// Configuration - make sure these match your Sanity config
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // Requires write token
});

async function resetSubscribers() {
  try {
    console.log('🔍 Fetching all subscribers...');
    
    // Fetch all subscription documents
    const subscribers = await client.fetch(`*[_type == "subscriptionForm"]._id`);
    
    if (subscribers.length === 0) {
      console.log('✅ No subscribers found. List is already empty.');
      return;
    }
    
    console.log(`📋 Found ${subscribers.length} subscribers to delete.`);
    
    // Confirm deletion
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question(`⚠️  Are you sure you want to delete ALL ${subscribers.length} subscribers? This cannot be undone. (yes/no): `, async (answer) => {
      if (answer.toLowerCase() === 'yes') {
        console.log('🗑️  Deleting subscribers...');
        
        // Delete all subscribers
        const transaction = client.transaction();
        subscribers.forEach(id => {
          transaction.delete(id);
        });
        
        await transaction.commit();
        
        console.log(`✅ Successfully deleted ${subscribers.length} subscribers.`);
      } else {
        console.log('❌ Operation cancelled.');
      }
      
      rl.close();
    });
    
  } catch (error) {
    console.error('❌ Error resetting subscribers:', error);
  }
}

// Run the script
resetSubscribers();