interface IPageProps {
  className?: string;
}

export default function Dashboard(props: IPageProps) {
  const { className } = props;

  return (
    <div className={className}>
      Dashboard
    </div>
  )
};
