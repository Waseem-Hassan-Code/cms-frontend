const avatarColors = [
  "#1976d2",
  "#388e3c",
  "#fbc02d",
  "#d32f2f",
  "#7b1fa2",
  "#0288d1",
  "#c2185b",
  "#ffa000",
];

function getInitials(name: string) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

export { avatarColors, getInitials, stringToColor };
