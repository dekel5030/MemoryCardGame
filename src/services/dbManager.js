export const fetchCharacter = async (id) => {
  const res = await fetch(`https://dragonball-api.com/api/characters/${id}`);
  if (!res.ok) throw new Error("Failed to fetch character");
  const data = await res.json();
  return data;
};
