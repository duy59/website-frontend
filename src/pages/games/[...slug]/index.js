import Layout from "../../../layouts/Layout";
export default function detailGame({ params }) {
    console.log(params);
    return (
      <>
      <Layout>
      Detail Game Page
      </Layout> 
      </>
    );
  }

  export async function getServerSideProps({ params }) {
    console.log(params); // Ensure params are correctly passed here
  
    return {
      props: { params }
    };
  }