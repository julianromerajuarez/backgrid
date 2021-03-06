/*
  backgrid
  http://github.com/wyuenho/backgrid

  Copyright (c) 2013 Jimmy Yuen Ho Wong
  Licensed under the MIT @license.
*/
describe("A Select2CellEditor", function () {

  var optionValues;
  var optionGroupValues;

  beforeEach(function () {
    optionValues = [
      ["Boy", 1],
      ["Girl", 2]
    ];

    optionGroupValues = [{
      "name": "Fruit",
      "values": [
        ["Apple", "a"],
        ["Banana", "b"],
        ["Cantaloupe", "c"]
      ]
    }, {
      "name": "Cereal",
      "values": [
        ["Wheat", "w"],
        ["Rice", "r"],
        ["Maize", "m"]
      ]
    }];
  });

  it("renders a select box using a list if nvps", function () {

    var editor = new Backgrid.Extension.Select2CellEditor({
      formatter: new Backgrid.CellFormatter(),
      column: {
        name: "gender",
        cell: "select2"
      },
      model: new Backbone.Model({
        gender: 2
      })
    });

    editor.setOptionValues(optionValues);
    editor.render();
    expect(editor.el.tagName).toBe("SELECT");
    var $options = editor.$el.children();
    expect($options.length).toBe(2);
    expect($options.eq(0).val()).toBe("1");
    expect($options.eq(0).prop("selected")).toBe(false);
    expect($options.eq(0).text()).toBe("Boy");
    expect($options.eq(1).val()).toBe("2");
    expect($options.eq(1).prop("selected")).toBe(true);
    expect($options.eq(1).text()).toBe("Girl");
  });

  it("renders a select box using a parameter-less function that returns a list if nvps", function () {

    var editor = new Backgrid.Extension.Select2CellEditor({
      formatter: new Backgrid.CellFormatter(),
      column: {
        name: "gender",
        cell: "select2"
      },
      model: new Backbone.Model({
        gender: 2
      })
    });

    editor.setOptionValues(function () {
      return optionValues;
    });
    editor.render();
    expect(editor.el.tagName).toBe("SELECT");
    var $options = editor.$el.children();
    expect($options.length).toBe(2);
    expect($options.eq(0).val()).toBe("1");
    expect($options.eq(0).prop("selected")).toBe(false);
    expect($options.eq(0).text()).toBe("Boy");
    expect($options.eq(1).val()).toBe("2");
    expect($options.eq(1).prop("selected")).toBe(true);
    expect($options.eq(1).text()).toBe("Girl");
  });

  it("renders a select box using a list of object literals denoting option groups", function () {

    var editor = new Backgrid.Extension.Select2CellEditor({
      formatter: new Backgrid.CellFormatter(),
      column: {
        name: "food",
        cell: "select2"
      },
      model: new Backbone.Model({
        food: "b"
      })
    });

    editor.setOptionValues(optionGroupValues);
    editor.render();
    var $optionGroups = editor.$el.children();
    expect($optionGroups.length).toBe(2);

    var $group1 = $optionGroups.eq(0);
    var $group2 = $optionGroups.eq(1);

    expect($group1.attr("label")).toBe("Fruit");
    expect($group2.attr("label")).toBe("Cereal");

    var $group1Options = $group1.children();
    expect($group1Options.eq(0).val()).toBe("a");
    expect($group1Options.eq(0).prop("selected")).toBe(false);
    expect($group1Options.eq(0).text()).toBe("Apple");
    expect($group1Options.eq(1).val()).toBe("b");
    expect($group1Options.eq(1).prop("selected")).toBe(true);
    expect($group1Options.eq(1).text()).toBe("Banana");
    expect($group1Options.eq(2).val()).toBe("c");
    expect($group1Options.eq(2).prop("selected")).toBe(false);
    expect($group1Options.eq(2).text()).toBe("Cantaloupe");

    var $group2Options = $group2.children();
    expect($group2Options.eq(0).val()).toBe("w");
    expect($group2Options.eq(0).prop("selected")).toBe(false);
    expect($group2Options.eq(0).text()).toBe("Wheat");
    expect($group2Options.eq(1).val()).toBe("r");
    expect($group2Options.eq(1).prop("selected")).toBe(false);
    expect($group2Options.eq(1).text()).toBe("Rice");
    expect($group2Options.eq(2).val()).toBe("m");
    expect($group2Options.eq(2).prop("selected")).toBe(false);
    expect($group2Options.eq(2).text()).toBe("Maize");
  });

  it("renders a select box using a parameter-less function that returns a list of object literals denoting option groups", function () {

    var editor = new Backgrid.Extension.Select2CellEditor({
      formatter: new Backgrid.CellFormatter(),
      column: {
        name: "food",
        cell: "select2"
      },
      model: new Backbone.Model({
        food: "b"
      })
    });

    editor.setOptionValues(function () {
      return optionGroupValues;
    });
    editor.render();
    var $optionGroups = editor.$el.children();
    expect($optionGroups.length).toBe(2);

    var $group1 = $optionGroups.eq(0);
    var $group2 = $optionGroups.eq(1);

    expect($group1.attr("label")).toBe("Fruit");
    expect($group2.attr("label")).toBe("Cereal");

    var $group1Options = $group1.children();
    expect($group1Options.eq(0).val()).toBe("a");
    expect($group1Options.eq(0).prop("selected")).toBe(false);
    expect($group1Options.eq(0).text()).toBe("Apple");
    expect($group1Options.eq(1).val()).toBe("b");
    expect($group1Options.eq(1).prop("selected")).toBe(true);
    expect($group1Options.eq(1).text()).toBe("Banana");
    expect($group1Options.eq(2).val()).toBe("c");
    expect($group1Options.eq(2).prop("selected")).toBe(false);
    expect($group1Options.eq(2).text()).toBe("Cantaloupe");

    var $group2Options = $group2.children();
    expect($group2Options.eq(0).val()).toBe("w");
    expect($group2Options.eq(0).prop("selected")).toBe(false);
    expect($group2Options.eq(0).text()).toBe("Wheat");
    expect($group2Options.eq(1).val()).toBe("r");
    expect($group2Options.eq(1).prop("selected")).toBe(false);
    expect($group2Options.eq(1).text()).toBe("Rice");
    expect($group2Options.eq(2).val()).toBe("m");
    expect($group2Options.eq(2).prop("selected")).toBe(false);
    expect($group2Options.eq(2).text()).toBe("Maize");
  });

  it("saves the value to the model on change", function () {

    var editor = new Backgrid.Extension.Select2CellEditor({
      formatter: new Backgrid.CellFormatter(),
      column: {
        name: "gender",
        cell: "select2"
      },
      model: new Backbone.Model({
        gender: 2
      })
    });

    editor.setOptionValues(optionValues);
    editor.render();

    spyOn(editor.formatter, "toRaw").andCallThrough();
    spyOn(editor, "trigger").andCallThrough();

    editor.$el.select2("val", 1).change();
    expect(editor.formatter.toRaw).toHaveBeenCalledWith("1");
    expect(editor.formatter.toRaw.calls.length).toBe(1);
    expect(editor.model.get(editor.column.get("name"))).toBe("1");
    expect(editor.trigger).toHaveBeenCalledWith("done");
    expect(editor.trigger.calls.length).toBe(1);
  });

});

describe("A Select2Cell", function () {

  var optionValues;
  var optionGroupValues;

  beforeEach(function () {
    optionValues = [
      ["Boy", 1],
      ["Girl", 2]
    ];

    optionGroupValues = [{
      "name": "Fruit",
      "values": [
        ["Apple", "a"],
        ["Banana", "b"],
        ["Cantaloupe", "c"]
      ]
    }, {
      "name": "Cereal",
      "values": [
        ["Wheat", "w"],
        ["Rice", "r"],
        ["Maize", "m"]
      ]
    }];
  });

  it("throws TypeError is optionValues is undefined", function () {

    expect(function () {
      new Backgrid.Extension.Select2Cell({
        column: {
          name: "gender",
          cell: "select2"
        },
        model: new Backbone.Model({
          gender: "m"
        })
      });
    }).toThrow(new TypeError("'optionValues' is required"));
    
  });

  it("applies a select2-cell class to the cell", function () {
    var cell = new (Backgrid.Extension.Select2Cell.extend({
      optionValues: optionValues
    }))({
      column: {
        name: "gender",
        cell: "select2"
      },
      model: new Backbone.Model({
        gender: "m"
      })
    });

    cell.render();

    expect(cell.$el.hasClass("select2-cell")).toBe(true);
  });

  it("renders the label of the selected option in display mode", function () {
    var cell = new (Backgrid.Extension.Select2Cell.extend({
      optionValues: optionValues
    }))({
      column: {
        name: "gender",
        cell: "select2"
      },
      model: new Backbone.Model({
        gender: 2
      })
    });

    cell.render();
    expect(cell.$el.text()).toBe("Girl");

    var cell = new (Backgrid.Extension.Select2Cell.extend({
      optionValues: optionGroupValues
    }))({
      column: {
        name: "food",
        cell: "select2"
      },
      model: new Backbone.Model({
        food: "b"
      })
    });

    cell.render();
    expect(cell.$el.text()).toBe("Banana");
  });

  it("throws TypeError when rendering a malformed option value list", function () {
    expect(function () {
      var cell = new (Backgrid.Extension.Select2Cell.extend({
        optionValues: []
      }))({
        column: {
          name: "gender",
          cell: "select2"
        },
        model: new Backbone.Model({
          gender: 2
        })
      });

      cell.render();

    }).toThrow(new TypeError("'optionValues' must be of type {Array.<Array>|Array.<{name: string, values: Array.<Array>}>}"));
  });

  it("renders a select2 box during edit mode", function () {
    var cell = new (Backgrid.Extension.Select2Cell.extend({
      select2Options: {
        width: "resolve"
      },
      optionValues: optionValues
    }))({
      column: {
        name: "gender",
        cell: "select2"
      },
      model: new Backbone.Model({
        gender: "m"
      })
    });

    cell.render();

    cell.$el.click();
    expect(cell.$el.find(".select2-container").length).toBe(1);
    expect(cell.currentEditor.select2Options).toEqual({width: "resolve"});
  });

});
