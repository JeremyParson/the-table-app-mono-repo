module.exports = {
  content: [
    "./src/App.js",
    "./src/presentation/campaign/CampaignManager.tsx",
    "./src/Presentation/view/campaign/CampaignCard.tsx",
    "./src/Presentation/view/campaign/CampaignGallery.tsx",
    "./src/presentation/campaign/CreateCampaign.tsx",
    "./src/Presentation/view/components/Home.tsx",
    "./src/Presentation/view/components/NavigationBar.tsx",
    "./src/Presentation/view/user/Registration.tsx",
    "./src/Presentation/view/user/Dashboard.tsx"
  ],
  theme: {
    extend: {
      colors: {
        "space-cadet": "#1E2952",
        "blue-munsell": "#068D9D",
        "tea-green": "#BFD7B5",
        "dutch-white": "#F2E7C9",
        "danger": "#db4242"
      },
    },
  },
  plugins: [],
};
