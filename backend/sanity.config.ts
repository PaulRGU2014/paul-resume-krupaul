/**
 * Standalone Sanity Studio configuration for deploying the admin backend separately.
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { dashboardTool } from "@sanity/dashboard";
import { Logo_BW } from "./public/Logo_BW";
import { presentationTool } from "sanity/presentation";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { codeInput } from "@sanity/code-input";
import { dashboardConfig } from "./src/sanity/dashboardConfig";

export default defineConfig({
  basePath: "/", // served at root of standalone backend
  projectId,
  dataset,
  title: "KruPaul Admin Panel",
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  icon: Logo_BW,
  schema,
  plugins: ((isProd) => {
    const base = [
      structureTool({
        structure: (S) =>
          S.list()
            .title("Main")
            .items([
              S.listItem()
                .title("Menu")
                .child(S.document().schemaType("header").documentId("header")),
              S.listItem()
                .title("Pages")
                .child(
                  S.documentTypeList("pages")
                    .title("Pages")
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType("pages")
                        .views([S.view.form()])
                    )
                ),
              S.listItem()
                .title("Footer")
                .child(S.document().schemaType("footer").documentId("footer")),
              // S.listItem()
              //   .title("Page Components")
              //   .child(
              //     S.list()
              //       .title("Page Components")
              //       .items([
              //         S.documentTypeListItem("header"),
              //         S.documentTypeListItem("footer"),
              //         // Add more page types here
              //       ]),
              //   ),
              // Activate Header and Footer when we want them to be different per page
              S.divider(),
              S.listItem()
                .title("Hero Components")
                .child(
                  S.list()
                    .title("Hero Components")
                    .items([
                      S.documentTypeListItem("hero"),
                      //addHere
                      S.documentTypeListItem("heroBannerImg"),
                      S.documentTypeListItem("fullPageZoom"),
                      S.documentTypeListItem("fullPageHero"),
                    ])
                ),
              S.listItem()
                .title("Carousel Components")
                .child(
                  S.list()
                    .title("Carousel Components")
                    .items([
                      //associateHere
                      S.documentTypeListItem("gridLinksCarousel"),
                      S.documentTypeListItem("ctasCarousel"),
                    ])
                ),
              S.listItem()
                .title("Media Components")
                .child(
                  S.list()
                    .title("Media Components")
                    .items([
                      //assignHere
                      S.documentTypeListItem("textAndImage"),
                      S.documentTypeListItem("twoColumnSlider"),
                      S.documentTypeListItem("textTwoImages"),
                      S.documentTypeListItem("textImageButton"),
                      S.documentTypeListItem("ctaTitleImg"),
                      S.documentTypeListItem("galleryCollage"),
                    ])
                ),
              S.listItem()
                .title("Other Components")
                .child(
                  S.list()
                    .title("Other Components")
                    .items([
                      //appendHere
                      S.documentTypeListItem("richTextComp"),
                      S.documentTypeListItem("hardcodedBlocks"),
                      S.documentTypeListItem("resume"),
                    ])
                ),
            ]),
      }),
      dashboardTool(dashboardConfig),
      // Vision is for querying with GROQ from inside the Studio
      // https://www.sanity.io/docs/the-vision-plugin
      visionTool({ defaultApiVersion: apiVersion }),
      media(),
      codeInput(),
    ];

    if (isProd) {
      base.push(
        presentationTool({
          previewUrl: {
            origin:
              process.env.SANITY_STUDIO_PREVIEW_ORIGIN ||
              process.env.NEXT_PUBLIC_SITE_URL ||
              (typeof window !== "undefined" ? window.location.origin : undefined),
            preview: "/",
            previewMode: {
              enable: "/api/draft-mode/enable",
              disable: "/api/draft-mode/disable",
            },
          },
        })
      );
    }

    return base;
  })(process.env.NODE_ENV === "production"),
});
