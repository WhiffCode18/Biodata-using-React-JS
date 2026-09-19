import { useState } from "react";

// Hitung warna avatar dari nama, supaya tiap orang punya warna sendiri
function getHue(name) {
  let hue = 0;
  for (const char of name) {
    hue = (hue * 31 + char.charCodeAt(0)) % 360;
  }
  return hue;
}

// Komponen menerima props dalam satu objek, jadi ditulis { name, email, ... }
function Biodata({ name, email, phone, onDelete }) {
  const hue = getHue(name);

  return (
    <li className="flex items-center gap-4 rounded-xl border border-teal-100 p-4">
      {/* Warna avatar dinamis, jadi tetap pakai style inline */}
      <div
        className="grid size-12 shrink-0 place-items-center rounded-full text-lg font-extrabold"
        style={{
          background: `hsl(${hue} 55% 88%)`,
          color: `hsl(${hue} 45% 25%)`,
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <p className="break-words font-bold">{name}</p>
        <p className="break-words text-sm text-slate-500">{email}</p>
        <p className="break-words text-sm text-slate-500">{phone}</p>
      </div>

      <button
        type="button"
        onClick={onDelete}
        aria-label={`Hapus ${name}`}
        className="cursor-pointer rounded-lg border border-teal-100 px-3 py-2 text-sm font-medium text-red-700 hover:border-red-700 hover:bg-red-50"
      >
        Hapus
      </button>
    </li>
  );
}

function Bio() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState([]);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // cegah halaman reload saat form dikirim

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Nama, email, dan telepon harus diisi semua.");
      return;
    }

    if (!email.includes("@")) {
      setError("Email harus memuat tanda @, contoh: owen@mail.com.");
      return;
    }

    const newPerson = {
      id: Date.now(), // id unik sederhana, dipakai sebagai key
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    setPeople([...people, newPerson]); // salin array lama, tambah data baru
    setName("");
    setEmail("");
    setPhone("");
    setError("");
  }

  function handleDelete(id) {
    setPeople(people.filter((person) => person.id !== id));
  }

  const panel = "rounded-2xl border border-teal-100 bg-white p-5 md:p-7";
  const title =
    "mb-5 flex items-center gap-2.5 text-xl font-extrabold tracking-tight";
  const label = "mb-1.5 text-sm font-medium text-slate-500";
  const input =
    "mb-4 rounded-lg border border-teal-100 bg-teal-50/50 px-3.5 py-3 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700";

  return (
    <div className="min-h-screen bg-teal-50 px-5 py-10 text-teal-950">
      <div className="mx-auto grid max-w-4xl items-start gap-6 md:grid-cols-[minmax(280px,380px)_1fr]">
        <section className={panel}>
          <h2 className={title}>Tambah biodata</h2>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="nama" className={label}>
              Nama
            </label>
            <input
              id="nama"
              type="text"
              placeholder="Owen Dwi Kristian Winata"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={input}
            />

            <label htmlFor="email" className={label}>
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="owen@mail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={input}
            />

            <label htmlFor="telepon" className={label}>
              Telepon
            </label>
            <input
              id="telepon"
              type="text"
              placeholder="0812 3456 7890"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={input}
            />

            {error && (
              <p
                role="alert"
                className="mb-4 border-l-4 border-red-700 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-teal-700 px-4 py-3 font-bold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-950"
            >
              Simpan biodata
            </button>
          </form>
        </section>

        <section className={panel}>
          <h2 className={title}>
            Daftar biodata
            <span className="min-w-7 rounded-full bg-teal-700 px-2.5 py-0.5 text-center text-sm font-bold text-white">
              {people.length}
            </span>
          </h2>

          {people.length === 0 ? (
            <p className="rounded-xl border border-dashed border-teal-200 px-4 py-8 text-center text-slate-500">
              Belum ada data. Isi form di samping lalu klik “Simpan biodata”.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {people.map((person) => (
                <Biodata
                  key={person.id}
                  name={person.name}
                  email={person.email}
                  phone={person.phone}
                  onDelete={() => handleDelete(person.id)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default Bio;
