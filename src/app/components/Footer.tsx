// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm text-center py-6 mt-12">
      <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
}
