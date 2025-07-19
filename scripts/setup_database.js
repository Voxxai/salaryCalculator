// Database Setup Script for Salary Calculator
// Run this script to set up the feedback table in Supabase
// Usage: node scripts/setup_database.js

const { createClient } = require("@supabase/supabase-js");

// Load environment variables
require("dotenv").config();

// Your Supabase credentials from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log("🚀 Setting up Supabase database...\n");

  try {
    // Test connection
    console.log("1. Testing connection...");
    const { data: testData, error: testError } = await supabase
      .from("feedback")
      .select("count")
      .limit(1);

    if (testError && testError.code === "PGRST116") {
      console.log("❌ Table does not exist. Creating table...");

      // Note: Table creation via API is limited in Supabase
      // You'll need to run the SQL script manually in the Supabase dashboard
      console.log(
        "\n📋 Please run the following SQL in your Supabase SQL Editor:"
      );
      console.log("=====================================");
      console.log(`
CREATE TABLE IF NOT EXISTS feedback (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('feature', 'bug', 'improvement', 'other')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  device_info TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(type);
CREATE INDEX IF NOT EXISTS idx_feedback_priority ON feedback(priority);
      `);
      console.log("=====================================\n");

      console.log("2. After creating the table, testing connection again...");

      // Wait a moment for table to be created
      await new Promise(resolve => setTimeout(resolve, 2000));

      const { data: testData2, error: testError2 } = await supabase
        .from("feedback")
        .select("count")
        .limit(1);

      if (testError2) {
        throw new Error(`Table creation failed: ${testError2.message}`);
      }
    } else if (testError) {
      throw new Error(`Connection test failed: ${testError.message}`);
    }

    console.log("✅ Connection successful!");

    // Insert sample data
    console.log("\n3. Inserting sample data...");
    const sampleData = [
      {
        type: "feature",
        title: "Dark Mode Support",
        description:
          "Would love to have a dark mode option for better visibility at night",
        priority: "medium",
        contact_email: "user@example.com",
        device_info: "1920x1080",
        user_agent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      {
        type: "bug",
        title: "Time Input Validation",
        description: "The time input sometimes accepts invalid formats",
        priority: "high",
        contact_email: "tester@example.com",
        device_info: "1366x768",
        user_agent: "Chrome/91.0.4472.124 Safari/537.36",
      },
      {
        type: "improvement",
        title: "Export to PDF",
        description: "Add ability to export salary calculations to PDF",
        priority: "low",
        contact_email: "admin@example.com",
        device_info: "2560x1440",
        user_agent: "Safari/14.0.3",
      },
    ];

    const { data: insertData, error: insertError } = await supabase
      .from("feedback")
      .insert(sampleData)
      .select();

    if (insertError) {
      console.log(
        "⚠️  Sample data insertion failed (table might be empty):",
        insertError.message
      );
    } else {
      console.log(`✅ Inserted ${insertData.length} sample records`);
    }

    // Test reading data
    console.log("\n4. Testing data retrieval...");
    const { data: readData, error: readError } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (readError) {
      throw new Error(`Data retrieval failed: ${readError.message}`);
    }

    console.log(`✅ Successfully retrieved ${readData.length} records`);
    console.log("\n📊 Sample data:");
    readData.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.title} (${item.type}, ${item.priority})`
      );
    });

    console.log("\n🎉 Database setup completed successfully!");
    console.log("\n📱 Your app is now ready to use the database.");
    console.log(
      "💡 Try submitting feedback through the app and check your Supabase dashboard!"
    );
  } catch (error) {
    console.error("\n❌ Database setup failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Check your Supabase credentials");
    console.log("2. Make sure the feedback table exists");
    console.log("3. Check your internet connection");
    console.log("4. Run the SQL script manually in Supabase dashboard");
  }
}

// Run the setup
setupDatabase();
