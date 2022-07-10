module.exports = {
  content: [
    "./src/App.js",
    "./src/presentation/campaign/CampaignManager.tsx",
    "./src/presentation/campaign/CampaignCard.tsx",
    "./src/presentation/campaign/CampaignGallery.tsx",
    "./src/presentation/campaign/CreateCampaign.tsx",
  ],
  theme: {
    extend: {
      colors: {
        "space-cadet": "#1E2952",
        "blue-munsell": "#068D9D",
        "tea-green": "#BFD7B5",
        "dutch-white": "#F2E7C9",
      },
    },
  },
  plugins: [],
};
