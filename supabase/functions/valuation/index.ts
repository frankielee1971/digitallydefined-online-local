import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    const { property_id } = await req.json();

    if (!property_id) {
      return new Response(JSON.stringify({ error: "property_id is required" }), {
        status: 400,
      });
    }

    const { data: property, error: fetchError } = await supabase
      .from("digital_properties")
      .select("*")
      .eq("id", property_id)
      .single();

    if (fetchError || !property) {
      return new Response(JSON.stringify({ error: "Property not found" }), {
        status: 404,
      });
    }

    const traffic = property.monthly_lead_traffic;
    const jobValue = property.avg_job_value;
    const closeRate = property.tenant_close_rate;
    const ppc = property.market_ppc_cost;

    const yieldValue = traffic * jobValue;
    const equityCap = yieldValue * 0.10;
    const leasePrice = yieldValue / 40;
    const ppcEquivalent = traffic * ppc;
    const tenantSavings = ppcEquivalent - leasePrice;

    const pitch = `
Hey, I'm auditing the traffic for my digital property, ${property.property_name}.
Last month, this asset delivered ${traffic} exclusive calls directly to your phone.
Even if your team only converts ${closeRate * 100}%, that is $${yieldValue.toLocaleString()} in gross revenue.
Replacing that traffic with Google Ads would cost $${ppcEquivalent.toLocaleString()}.
The exclusive territory lease is $${leasePrice.toFixed(0)}/month.
You save $${tenantSavings.toLocaleString()} compared to PPC.
    `.trim();

    const { data: valuation, error: insertError } = await supabase
      .from("property_valuations")
      .insert({
        property_id,
        yield_value: yieldValue,
        equity_cap: equityCap,
        lease_price: leasePrice,
        ppc_equivalent: ppcEquivalent,
        tenant_savings: tenantSavings,
        pitch_text: pitch,
      })
      .select()
      .single();

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ valuation }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
});
