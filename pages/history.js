// import Link from "next/link";
import { Card, Typography, Space } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
//

export default function History({ user, tablex }) {
  // let juju = "porkbun@uilo.com";

  return (
    <div style={{ maxWidth: "420px", margin: "96px auto" }}>
      <Card>
        <Space direction="vertical" size={6}>
          <Typography.Text>You're signed in</Typography.Text>
          <Typography.Text strong>Email: {user.email}</Typography.Text>
          <br />

          {/* <Typography.Text type="success">
            ID: {user.id}
            User data retrieved server-side (from Cookie in getServerSideProps):
          </Typography.Text>

          <Typography.Text>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </Typography.Text> */}

          {/* <Typography.Text>
            <Link href="">
              <a>BACK!</a>
            </Link>
          </Typography.Text> */}
        </Space>
        <Typography.Text>
          <Space direction="vertical" size={1}>
            <table border="1px">
              <thead>
                <tr>
                  <th>email</th>
                  <th>name</th>
                  <th>phone</th>
                </tr>
              </thead>
            </table>
            {tablex.map((tZ, value) => (
              <table border="0px">
                <tbody>
                  <tr>
                    <td>{tZ.email}</td>
                    <td>{tZ.name}</td>
                    <td>{tZ.phone}</td>
                  </tr>
                </tbody>
              </table>
            ))}
          </Space>
        </Typography.Text>
      </Card>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const { data: tablex } = await supabase
    .from("tablex")
    .select("name, email, phone")
    .eq("email", user.email);

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }

  // If there is a user, return it.
  return { props: { user, tablex } };

  // if (tablex) {
  //   return { props: { tablex } };
  // }
}

// export async function getServerSideProps({ req }) {

//   const { user } = await supabase.auth.api.getUserByCookie(req);
//   if (!user) {
//     return { props: {}, redirect: { destination: "/", permanent: false } };
//   } else {
//     // If no user, redirect to index
//     return { props: { user } };
//   } // If there is a user, return it.
// }
