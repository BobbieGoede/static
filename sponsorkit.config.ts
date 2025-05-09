import { BadgePreset, defineConfig, presets } from "sponsorkit";
import fs from "fs/promises";

const past: BadgePreset = {
  avatar: {
    size: 20,
  },
  boxWidth: 22,
  boxHeight: 22,
  container: {
    sidePadding: 35,
  },
};

export default defineConfig({
  github: {
    login: "bobbiegoede",
    type: "user",
  },
  tiers: [
    {
      title: "Past Sponsors",
      monthlyDollars: -1,
      preset: past,
    },
    {
      title: "Backers",
      preset: presets.small,
    },
    {
      title: "Sponsors",
      monthlyDollars: 25,
      preset: {
        avatar: {
          size: 42,
        },
        boxWidth: 52,
        boxHeight: 52,
        container: {
          sidePadding: 30,
        },
      },
    },
    {
      title: "Super Sponsors",
      monthlyDollars: 50,
      preset: presets.medium,
    },
    {
      title: "Bronze Sponsors",
      monthlyDollars: 100,
      preset: presets.medium,
    },
    {
      title: "Silver Sponsors",
      monthlyDollars: 250,
      preset: presets.medium,
    },
    {
      title: "Gold Sponsors",
      monthlyDollars: 500,
      preset: presets.large,
    },
    {
      title: "Diamond Sponsors",
      monthlyDollars: 1000,
      preset: presets.xl,
    },
    // {
    //   title: 'Special Sponsor',
    //   monthlyDollars: Infinity,
    // },
  ],

  async onSponsorsReady(sponsors) {
    await fs.writeFile(
      "sponsors.json",
      JSON.stringify(
        sponsors
          .filter((i) => i.privacyLevel !== "PRIVATE")
          .map((i) => {
            return {
              name: i.sponsor.name,
              login: i.sponsor.login,
              avatar: i.sponsor.avatarUrl,
              amount: i.monthlyDollars,
              link: i.sponsor.linkUrl || i.sponsor.websiteUrl,
              org: i.sponsor.type === "Organization",
            };
          })
          .sort((a, b) => b.amount - a.amount),
        null,
        2
      )
    );
  },

  outputDir: ".",
  formats: ["svg", "png"],

  renders: [
    {
      name: "sponsors",
      width: 800,
    },
    {
      name: "sponsors.wide",
      width: 1800,
    },

    {
      name: "sponsors.circles",
      width: 1000,
      includePastSponsors: true,
      renderer: "circles",
      circles: {
        radiusPast: 3,
      },
    },
  ],
});
