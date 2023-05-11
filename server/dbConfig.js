require('dotenv').config()
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.DB_URL;
const supabaseKey = process.env.DB_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: "public" },
});

module.exports = supabase;