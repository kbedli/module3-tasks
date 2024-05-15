import { FormEventHandler, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type Users = {
  users: [] | User[];
};

export const UsersList = () => {
  const [user, setUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [users, setUsers] = useState<Users>([]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setUsers([...users, user]);
    setUser({ id: "gddhd", firstName: "", lastName: "", email: "" });
    console.log(users);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <input
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <button type="submit" onClick={() => console.log(user)}>
          Add
        </button>
      </form>

      {users.map((user) => {
        const { id, firstName, lastName, email } = user;
        return (
          <p key={id}>
            {firstName}, {lastName}, {email}
          </p>
        );
      })}
    </>
  );
};
