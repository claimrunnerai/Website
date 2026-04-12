import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to save newsletter signup
export const saveNewsletterSignup = async (firstName, lastName, email, company) => {
  try {
    // First, check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('newsletter_signups')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      // Email already exists
      return { 
        success: false, 
        error: { message: 'You have already signed up! Stay tuned.' },
        alreadyExists: true 
      };
    }

    // If error is "not found" (no rows), that's good - we can proceed
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking email:', checkError.message);
      throw checkError;
    }

    // Email doesn't exist, proceed with insert
    const { data, error } = await supabase
      .from('newsletter_signups')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          company: company || null,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Error saving signup:', error.message);
      throw error;
    }

    console.log('Signup saved successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to save signup:', error);
    return { success: false, error };
  }
};
