import { useReducer } from "react";
import { users, type User } from "./data";
import { v4 as uuid4 } from "uuid";
import { useForm } from "react-hook-form";

const initialState = users;

enum Action {
  CREATE_USER = "create-user",
  DELETE_USER = "delete-user",
  MODIFY_USER = "modify-user",
}

type ActionType =
  | {
      type: Action.CREATE_USER;
      payload: User;
    }
  | {
      type: Action.DELETE_USER;
      payload: {
        id: string;
      };
    }
  | {
      type: Action.MODIFY_USER;
      payload: User;
    };

const reducer = (state: User[], action: ActionType) => {
  switch (action.type) {
    case Action.CREATE_USER:
      return [...state, action.payload];
    case Action.DELETE_USER: // { id: number }
      return state.filter((user) => user.id !== action.payload?.id);
    case Action.MODIFY_USER:
      return state.map((user) => {
        if (user.id === action.payload?.id) {
          return { ...user, user: action.payload };
        }
        return user;
      });

    default:
      return state;
  }
  return state;
};

export const UsersListWithReducer = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>();

  const [state, dispatch] = useReducer(reducer, initialState);

  // const handleFormData = (data: User) => {
  //   dispatch({
  //     type: Action.CREATE_USER,
  //     payload: {
  //       id: uuid4(),
  //       age: data.age,
  //       nickname: data.nickname,
  //     },
  //   });

  //   console.log(data);
  // };

  const handleFormData = (data: User) => {
    dispatch({
      type: Action.MODIFY_USER,
      payload: {
        id: data.id,
        age: data.age,
        nickname: data.nickname,
      },
    });

    console.log(data);
  };

  const deleteUser = (id: string) => {
    dispatch({
      type: Action.DELETE_USER,
      payload: {
        id: id,
      },
    });
  };

  const editUser = (id: string) => {
    const specificUser: User = users.find((user) => user.id === id);
    setValue("age", specificUser.age);
    setValue("nickname", specificUser.nickname);

    handleFormData(specificUser);
    // dispatch({
    //   type: Action.MODIFY_USER,
    //   payload: {
    //     id: id,
    //   },
    // });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormData)}>
        <input {...register("age", { required: true })} type="number" />
        {errors.age && <p> Age is required</p>}
        <input {...register("nickname", { required: true })} />
        {errors.nickname && <p>Nicknamed is required</p>}
        <button type="submit">Add User</button>
      </form>
      {state.map((user) => (
        <>
          <div key={user.id}>
            {user.age} {user.nickname}
          </div>
          <button onClick={() => deleteUser(user.id)}>Delete User</button>
          <button onClick={() => editUser(user.id)}>Edit User</button>
        </>
      ))}
    </div>
  );
};
