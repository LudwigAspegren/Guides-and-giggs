import { createSupabaseClient } from '@supabase/auth-helpers-sveltekit';

const supabaseUrl = 'https://djtaonenojsxepcakvvu.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdGFvbmVub2pzeGVwY2FrdnZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgzOTQ4OTYsImV4cCI6MTk3Mzk3MDg5Nn0.xWRitrqda_HxnM44t3TxPwLueabX89VAtt8jBptBYI0';

const instantiateSupabase = () => {
	const { supabaseClient } = createSupabaseClient(supabaseUrl, supabaseAnonKey);
	if (supabaseClient === undefined) throw 'supabaseClient needs to be instantiated';
	return supabaseClient;
};
const supabaseClient = instantiateSupabase();
export { supabaseClient };
