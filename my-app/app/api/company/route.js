export async function GET(req) {
  const url = new URL(
    "https://functiondataprocess-f7adbacqbsdtbbez.northeurope-01.azurewebsites.net/api/GetCompanyData"
  );
  url.searchParams.append("code", "ZMFJhTPfTSAVXzM5Di3IjqPCzFz-ee6hVov6KdWA2S_0AzFuvHxTZA==");
  url.searchParams.append("fieldName", "SateskommunKod");
  url.searchParams.append("fieldValue", "0136");

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: res.status });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
