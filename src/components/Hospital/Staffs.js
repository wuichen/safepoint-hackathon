import React from "react";
import { Table, Tag } from "antd";

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    roles: ["nurse"]
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    roles: ["doctor"]
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    roles: ["staff"]
  }
];

const Public = () => {
  return (
    <Table dataSource={data}>
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
      </ColumnGroup>
      <Column title="Age" dataIndex="age" key="age" />
      <Column title="Address" dataIndex="address" key="address" />
      <Column
        title="Roles"
        dataIndex="roles"
        key="roles"
        render={roles => (
          <span>
            {roles.map(role => (
              <Tag color="blue" key={role}>
                {role}
              </Tag>
            ))}
          </span>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <div>
            <a>Schedule</a>
            <br />
          </div>
        )}
      />
    </Table>
  );
};

export default Public;
