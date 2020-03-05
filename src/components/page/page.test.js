import React from "react";
import renderer from "react-test-renderer";
import Page from "./page.jsx";

const children = <div className="children-component" />;

describe(`Page component render correctly`, () => {
  it(`with type GameType.ARTIST`, () => {
    const tree = renderer.create(
        <Page>
          {children}
        </Page>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
