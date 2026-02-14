import { defineField, defineType } from "sanity";

export const pages = defineType({
  name: "pages",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "page_title",
      type: "string",
    }),
    defineField({
      name: "page_url",
      type: "slug",
    }),
    // defineField({
    //   name: 'menu',
    //   title: 'Menu',
    //   type: 'reference',
    //   to: [{type: 'header'}]
    // }),
    //  Activate when we want different menu per page
    defineField({
      name: "components",
      type: "array",
      of: [
        //associateHere
        { type: "ctaTitleImg" },
        { type: "ctasCarousel" },
        { type: "fullPageHero" },
        { type: "fullPageZoom" },
        { type: "galleryCollage" },
        { type: "gridLinksCarousel" },
        { type: "hardcodedBlocks" },
        { type: "hero" },
        { type: "heroBannerImg" },
        { type: "resume" },
        { type: "richTextComp" },
        { type: "textAndImage" },
        { type: "textImageButton" },
        { type: "textTwoImages" },
        { type: "twoColumnSlider" },
      ],
      options: {
        insertMenu: {
          filter: true,
          showIcons: true,
          groups: [
            {
              name: "hero",
              title: "Hero Components",
              of: [
                //heroComponent                
                "hero",
                "fullPageHero",
                "fullPageZoom",
                "heroBannerImg",
              ],
            },
            {
              name: "carousel",
              title: "Carousel Components",
              of: [
                //carouselComponent
                "ctasCarousel",
                "gridLinksCarousel",
              ],
            },
            {
              name: "media",
              title: "Media Components",
              of: [
                //mediaComponent
                "ctaTitleImg",
                "galleryCollage",
                "textAndImage",
                "textImageButton",
                "textTwoImages",
                "twoColumnSlider",
              ],
            },
            {
              name: "other",
              title: "Other Components",
              of: [
                //otherComponent
                "hardcodedBlocks",
                "resume",
                "richTextComp",
              ],
            },
          ],
          views: [{ name: "list" }, { name: "grid" }],
        },
      },
    }),
    // defineField({
    //   name: 'footer',
    //   title: 'Footer',
    //   type: 'reference',
    //   to: [{type: 'footer'}]
    // }),
    //  Activate when we want different footer per page
  ],
});
