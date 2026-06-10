import UserLayout from "../../layouts/user/UserLayout";
import Home from "../../pages/users/beranda/Home";
import TentangKami from "../../pages/users/tentangkami/TentangKami";
import BisnisKami from "../../pages/users/bisniskami/BisnisKami";
import Berita from "../../pages/users/berita/Berita";
import IsiBerita from "../../pages/users/berita/IsiBerita";
import Internship from "../../pages/users/internship/Internship";
import LowonganKerja from "../../pages/users/lowongankerja/LowonganKerja";
import DetailLoker from "../../pages/users/detailloker/DetailLoker";
import CekLamaran from "../../pages/users/ceklamaran/CekLamaran";
import StatusLamaran from "../../pages/users/statuslamaran/StatusLamaran";
import Kontak from "../../pages/users/kontak/Kontak";

export const userRoutes = {
    path: "/",
    element: <UserLayout />,
    children: [
        { index: true, element: <Home /> },
        { path: "tentang-kami", element: <TentangKami /> },
        { path: "bisnis-kami", element: <BisnisKami /> },
        { path: "berita", element: <Berita /> },
        { path: "berita/:id", element: <IsiBerita /> },
        { path: "internship", element: <Internship /> },
        { path: "lowongan-kerja", element: <LowonganKerja /> },
        { path: "lowongan-kerja/:id", element: <DetailLoker /> },
        { path: "cek-lamaran", element: <CekLamaran /> },
        { path: "cek-lamaran/status", element: <StatusLamaran /> },
        { path: "cek-lamaran/status/:applicationId", element: <StatusLamaran /> },
        { path: "kontak", element: <Kontak /> },
    ],
};