import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import { getDefaultToolbarCommands } from "react-mde";
import "react-mde/lib/styles/css/react-mde-toolbar.css";

export default function Editor({ currentNote, updateNote, chevron, displaySidebar, setDisplaySidebar }) {
  const [selectedTab, setSelectedTab] = React.useState("write");
  const commands = getDefaultToolbarCommands();

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="pane-editor">
                    <div>
              <button
                className={`chevron ${!displaySidebar ? "" : "closed"}`}
                onClick={() => setDisplaySidebar(prevState => !prevState)}
              >
                <img
                  src={chevron}
                  className={!displaySidebar ? "closed" : ""}
                  alt=""
                />
              </button>
            </div>

      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
        toolbarCommands={commands}
      />
    </section>
  );
}
