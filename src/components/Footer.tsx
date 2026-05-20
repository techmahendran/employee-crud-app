type FooterProps = {
  storedRecords: {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
  }[];

  allRecords: {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
  }[];
};

const Footer = ({ storedRecords, allRecords }: FooterProps) => {
  return (
    <footer className="bg-slate-100 text-gray-700 py-4 mt-6 pl-6 border-t border-slate-200 rounded-b-2xl">
      <p className="text-sm font-bold">
        Showing {storedRecords.length} of {allRecords.length} Records
      </p>
    </footer>
  );
};

export default Footer;
