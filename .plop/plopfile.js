module.exports = (plop) => {
  plop.setGenerator("block-component", {
    description: "Generate a static block component",
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
          type: "append",
          path: "../src/components/ComponentLoader.tsx",
          pattern: /\/\/associateHere/,
          template: "\t{{camelCase name}}: {{pascalCase name}},",
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
      ];

      return actions;
    },
  });
  plop.setGenerator("hard-coded", {
    description: "Generate a static hard-coded component",
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
    description: "Generate a static utility component",
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
    ],
  });
};
