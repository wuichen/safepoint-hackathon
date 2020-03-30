import React from "react";
import { Table, Tag, Modal } from "antd";

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: "1",

    age: 32,
    tags: ["cough", "diabetes"]
  },
  {
    key: "2",

    age: 42,
    tags: ["breathing difficulties"]
  },
  {
    key: "3",

    age: 32,
    tags: ["cough", "weak immune history"]
  }
];

function invite() {
  Modal.info({
    title:
      "Would you like to send an invitation to this patient for treatment?",
    content: (
      <div>
        <p>
          The patient will appear in your system once they confirmed to get
          treatment
        </p>
      </div>
    ),
    onOk() {}
  });
}

const Public = () => {
  return (
    <Table dataSource={data}>
      <Column title="Age" dataIndex="age" key="age" />
      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={tags => (
          <span>
            {tags.map(tag => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </span>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <span>
            <a onClick={() => invite()}>Invite</a>
          </span>
        )}
      />
    </Table>
  );
};

export default Public;
