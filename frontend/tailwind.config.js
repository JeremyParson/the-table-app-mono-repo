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
    "./src/Presentation/view/user/Dashboard.tsx",
    "./src/Presentation/view/character/CreateCharacter.tsx",
    "./src/Presentation/view/character/SelectRaceTab.tsx",
    "./src/Presentation/view/campaign/CampaignDetail.tsx",
    "./src/Presentation/view/character/SelectClassTab.tsx",
    "./src/Presentation/view/character/AbilityTab.tsx",
    "./src/Presentation/view/character/SummaryTab.tsx",
    "./src/Presentation/view/campaign/session/SessionChat.tsx",
    "./src/Presentation/view/campaign/Session.tsx",
    "./src/Presentation/view/campaign/session/ThtTable.tsx",
    "./src/Presentation/view/campaign/session/CharacterSheet.tsx",
  ],
  theme: {
    screens: {
      tn: "500px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "space-cadet": "#1E2952",
        "blue-munsell": "#068D9D",
        "tea-green": "#BFD7B5",
        "dutch-white": "#F2E7C9",
        danger: "#db4242",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
