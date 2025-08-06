import { component$ } from "@qwik.dev/core";
import { useGetUserByUId } from "~/routes/(authenticated)/admin/layout";

export default component$(() => {
  const user = useGetUserByUId();
  return (
    <section>
      <h1>User detail</h1>
      {user.value ? (
        <>
          <p>id: {user.value.id}</p>
          <p>Name: {user.value.name}</p>
          <p>Email: {user.value.email}</p>
          <p>role: {user.value.role}</p>
        </>
      ) : (
        <p>User not found</p>
      )}
    </section>
  );
});
