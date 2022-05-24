import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React - Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of a highly active react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//       revalidate: 10,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://Lubo:1234@cluster0.zw0h3.mongodb.net/?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
    },
    revalidate: 3,
  };
}

export default HomePage;
