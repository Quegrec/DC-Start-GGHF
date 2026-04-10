export async function fetchDataset<T>(key: string): Promise<T> {
  const response = await fetch(`/api/data/${key}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dataset '${key}'`);
  }

  return (await response.json()) as T;
}
