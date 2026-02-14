module.exports = (plop) => {
  plop.setGenerator("block-component", {
    description: "Generate a block component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What to name the block component?",
      },
      {
        type: "list",
        name: "type",
        message: "What type of block component you want it to be?",
        choices: [
          "Hero component",
          "Carousel component",
          "Media component",
          "Other component",
        ],
      },
    ],
    actions: function (data) {
      const actions = [
        {
          type: "add",
          path: "../backend/src/components/{{pascalCase name}}/{{camelCase name}}.schema.ts",
          templateFile: "./sanityfield.hbs",
        },
        {
          type: "append",
          path: "../backend/src/sanity/schemaTypes/index.ts",
          pattern: /\/\/importHere/,
          template:
            "\timport { {{camelCase name}} } from '../../components/{{pascalCase name}}/{{camelCase name}}.schema';",
        },
        {
          type: "append",
          path: "../backend/src/sanity/schemaTypes/index.ts",
          pattern: /\/\/associateHere/,
          template: "{{camelCase name}},",
        },
        {
          type: "append",
          path: "../backend/src/sanity/schemaTypes/pages.ts",
          pattern: /\/\/associateHere/,
          template: "\t{ type : '{{camelCase name}}' },",
        },
        {
          type: "append",
          path: "../src/components/ComponentLoader.tsx",
          pattern: /\/\/associateHere/,
          template: "\t{{camelCase name}}: {{name}},",
        },
        {
          type: "append",
          path: "../src/components/ComponentLoader.tsx",
          pattern: /\/\/importHere/,
          template:
            "\timport {{pascalCase name}} from './{{pascalCase name}}/{{pascalCase name}}';",
        },
        {
          type: "add",
          path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
          templateFile: "./componentJs.hbs",
        },
        {
          type: "add",
          path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss",
          templateFile: "./componentScss.hbs",
        },
        {
          type: "add",
          path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.stories.ts",
          templateFile: "./componentStories.hbs",
        },
      ];

      if (data.type === "Hero component") {
        actions.push({
          type: "append",
          path: "../backend/sanity.config.ts",
          pattern: /\/\/addHere/,
          template: '\tS.documentTypeListItem("{{camelCase name}}"),',
        });
        actions.push({
          type: "append",
          path: "../backend/src/sanity/schemaTypes/pages.ts",
          pattern: /\/\/heroComponent/,
          template: "\t{ type : '{{camelCase name}}' },",
        });
      } else if (data.type === "Carousel component") {
        actions.push({
          type: "append",
          path: "../backend/sanity.config.ts",
          pattern: /\/\/associateHere/,
          template: '\tS.documentTypeListItem("{{camelCase name}}"),',
        });
        actions.push({
          type: "append",
          path: "../backend/src/sanity/schemaTypes/pages.ts",
          pattern: /\/\/carouselComponent/,
          template: "\t{ type : '{{camelCase name}}' },",
        });
      } else if (data.type === "Media component") {
        actions.push({
          type: "append",
          path: "../backend/sanity.config.ts",
          pattern: /\/\/assignHere/,
          template: '\tS.documentTypeListItem("{{camelCase name}}"),',
        });
        actions.push({
          type: "append",
          path: "../backend/src/sanity/schemaTypes/pages.ts",
          pattern: /\/\/mediaComponent/,
          template: "\t{ type : '{{camelCase name}}' },",
        });
      } else if (data.type === "Other component") {
        actions.push({
          type: "append",
          path: "../backend/sanity.config.ts",
          pattern: /\/\/appendHere/,
          template: '\tS.documentTypeListItem("{{camelCase name}}"),',
        });
        actions.push({
          type: "append",
          path: "../backend/src/sanity/schemaTypes/pages.ts",
          pattern: /\/\/otherComponent/,
          template: "\t{ type : '{{camelCase name}}' },",
        });
      }
      return actions;
    },
  });
  plop.setGenerator("hard-coded", {
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What to name the hard-coded component?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "./componentJs.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss",
        templateFile: "./componentScss.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.stories.ts",
        templateFile: "./componentStories.hbs",
      },
      {
        type: "append",
        path: "../src/components/ComponentLoader.tsx",
        pattern: /\/\/importHere/,
        template:
          "\timport {{{pascalCase name}}} from './{{pascalCase name}}/{{pascalCase name}}';",
      },
      {
        type: "append",
        path: "../src/components/ComponentLoader.tsx",
        pattern: /\/\/hardCodedHere/,
        template: "\t{{camelCase name}}: {{pascalCase name}},",
      },
    ],
  });
  plop.setGenerator("utils", {
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What to name the utility component?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/utils/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "./utilJs.hbs",
      },
      {
        type: "add",
        path: "../src/utils/{{pascalCase name}}/{{pascalCase name}}.module.scss",
        templateFile: "./utilScss.hbs",
      },
      {
        type: "add",
        path: "../src/utils/{{pascalCase name}}/{{pascalCase name}}.stories.ts",
        templateFile: "./utilStories.hbs",
      },
    ],
  });
};
