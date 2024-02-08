const Page = ({ params }: { params: { id: string } }) => {
  return <div>Este es el detalle de la notificación {params.id}</div>;
};

export default Page;
