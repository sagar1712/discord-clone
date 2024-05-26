const ServerPage = async ({ params }: { params: { serverId: string } }) => {
  return <>Welcome to the server {params.serverId}</>;
};
export default ServerPage;
