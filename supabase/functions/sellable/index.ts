import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    // Fetch all digital properties that are marked as sellable
    const { data: properties, error: fetchError } = await supabase
      .from("digital_properties")
      .select("*")
      .eq("is_sellable", true);

    if (fetchError) {
      return new Response(JSON.stringify({ error: fetchError.message }), {
        status: 500,
      });
    }

    // If no sellable properties exist
    if (!properties || properties.length === 0) {
      return new Response(JSON.stringify({ message: "No sellable properties found." }), {
        status: 200,
      });
    }

    // Example processing — you can customize this logic
    const processed = properties.map((p) => ({
      id: p.id,
      name: p.property_name,
      traffic: p.monthly_lead_traffic,
      avg_job_value: p.avg_job_value,
      tenant_close_rate: p.tenant_close_rate,
      market_ppc_cost: p.market_ppc_cost,
    }));

    return new Response(JSON.stringify({ sellable: processed }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
});
