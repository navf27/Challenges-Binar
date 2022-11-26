-- 1. CREATE TABLE (DDL) --
CREATE TABLE dosen (
    nip VARCHAR(12) PRIMARY KEY,
    nama_dosen VARCHAR(45)
)

CREATE TABLE mahasiswa (
    nim VARCHAR(10) PRIMARY KEY,
    nama_mhs VARCHAR(45),
    tgl_lahir DATE,
    alamat VARCHAR(50),
    jenis_kelamin VARCHAR(12)
)

CREATE TABLE kuliah (
    nim VARCHAR(10),
    kode_mk VARCHAR(8),
    nip VARCHAR(12),
    nilai CHAR(1)
)

CREATE TABLE mata_kuliah (
    kode_mk VARCHAR(10) PRIMARY KEY,
    nama_mk VARCHAR(20),
    sks INTEGER
)

-- 2. CREATE / INSERT DATA (DML)--
INSERT INTO dosen (nip, nama_dosen) VALUES
('1.001.985', 'Helmi Imaduddin, S.Kom., '),
('1.002.057', 'Ihsan Cahyo Utomo, M.Kom'),
('1.002.058', 'Diah Priyawati, S.T., M.E'),
('1197', 'Dr.Eng. Yusuf Sulistyo Nu'),
('1198', 'Azizah Fatmawati, M.Cs., '),
('1305', 'Dedi Gunawan, S.T., M.Sc,'),
('1564', 'Helman Muhammad, S.T., M.'),
('1704', 'Endang Wahyu Pamungkas, S'),
('1811', 'Dimas Aryo Anggoro, S.Kom'),
('1819', 'Devi Afriyantari Puspa Pu'),
('1919', 'Maryam , S.Kom., M.Eng.'),
('706', 'Husni Thamrin, M.T., Ph.D'),
('738', 'Fatah Yasin Al Irsyadi, S'),
('793', 'Ir. Bana Handaga, M.T., P'),
('881', 'Nurgiyatna, S.T., M.Sc., '),
('968', 'Gunawan Ariyanto, S.T., M'),
('969', 'Dr. Endah Sudarmilah, S.T'),
('983', 'Aris Rakhmadi, S.T., M.En');

INSERT INTO kuliah (nim, kode_mk, nip, nilai) VALUES
('L200190166', 'TIF10334', '706', 'A'),
('L200190203', 'TIF10334', '706', 'B'),
('L200200071', 'TIF10334', '706', 'C'),
('L200200072', 'TIF10334', '706', 'D'),
('L200200073', 'TIF10334', '706', 'E'),
('L200200074', 'TIF10334', '706', 'A'),
('L200200075', 'TIF10334', '706', 'B'),
('L200200077', 'TIF10334', '706', 'C'),
('L200200078', 'TIF10334', '706', 'D'),
('L200200079', 'TIF10334', '706', 'E'),
('L200200080', 'TIF10334', '706', 'A'),
('L200200081', 'TIF10533', '969', 'B'),
('L200200082', 'TIF10334', '706', 'C'),
('L200200083', 'TIF10334', '706', 'D'),
('L200200084', 'TIF10334', '706', 'E'),
('L200200085', 'TIF10334', '706', 'A'),
('L200200086', 'TIF10334', '706', 'B'),
('L200200087', 'TIF10334', '706', 'C'),
('L200200088', 'TIF10334', '706', 'D'),
('L200200090', 'TIF10334', '706', 'E'),
('L200200091', 'TIF10334', '706', 'A'),
('L200200088', 'TIF10732', '881', 'A'),
('L200200088', 'TIF10533', '969', 'B'),
('L200200090', 'TIF10533', '969', 'C'),
('L200200091', 'TIF10533', '969', 'A'),
('L200200088', 'TIF10633', '738', 'B'),
('L200200090', 'TIF10633', '738', 'C'),
('L200200091', 'TIF10633', '738', 'A'),
('L200200090', 'TIF10732', '881', 'B'),
('L200200091', 'TIF10732', '881', 'C'),
('L200200090', 'TIF20333', '1198', 'A'),
('L200200091', 'TIF20333', '1198', 'B'),
('L200200090', 'TIF20333', '1704', 'C'),
('L200200091', 'TIF20333', '1704', 'A'),
('L200200090', 'TIF20433', '983', 'B'),
('L200200091', 'TIF20433', '983', 'C'),
('L200200090', 'TIF20433', '738', 'A'),
('L200200091', 'TIF20433', '738', 'B'),
('L200200090', 'TIF20433', '881', 'C'),
('L200200091', 'TIF20433', '881', 'A'),
('L200190166', 'TIF20531', '1819', 'B'),
('L200190203', 'TIF20633', '1197', 'C'),
('L200200071', 'TIF20733', '983', 'A'),
('L200200072', 'TIF20833', '1811', 'B'),
('L200200073', 'TIF30233', '1.001.985', 'C'),
('L200200074', 'TIF30331', '1.001.985', 'A'),
('L200200075', 'TIF30433', '983', 'B'),
('L200200077', 'TIF30533', '1.002.058', 'C'),
('L200200078', 'TIF30631', '1.002.058', 'A'),
('L200200079', 'TIF30733', '983', 'B'),
('L200200080', 'TIF30833', '1305', 'C'),
('L200200081', 'TIF40334', '706', 'A'),
('L200200082', 'TIF40533', '1.001.985', 'B'),
('L200200083', 'TIF40631', '1198', 'C'),
('L200200084', 'TIF40733', '793', 'A'),
('L200200085', 'TIF40831', '1919', 'B'),
('L200200086', 'TIF40933', '1197', 'C');

INSERT INTO mahasiswa (nim, nama_mhs, tgl_lahir, alamat, jenis_kelamin) VALUES
('L200190166', 'ADY JATI AMOGHASIDA', '2000-10-30', 'solo', 'laki-laki'),
('L200190203', 'ALIF PUTRA BASKARA', '2000-10-30', 'solo', 'laki-laki'),
('L200200071', 'DEVANO FADHIL MULIA', '2000-10-30', 'boyolali', 'laki-laki'),
('L200200072', 'RIDA ARINA ROSYADA', '2000-10-30', 'boyolali', 'perempuan'),
('L200200073', 'RIO KURNIAWAN', '2000-10-30', 'klaten', 'laki-laki'),
('L200200074', 'ANDIKA RISKY FAIZATAMA', '2000-10-30', 'klaten', 'laki-laki'),
('L200200075', 'MUHAMMAD KURNIA ADI WIJAY', '2000-10-30', 'wonogiri', 'laki-laki'),
('L200200077', 'RAIHAN TRESNA ASYAHADI', '2000-10-30', 'wonogiri', 'laki-laki'),
('L200200078', 'DIVA RAMADHAN RADITYATAMA', '2000-10-30', 'sukoharjo', 'laki-laki'),
('L200200079', 'IRFAN NUR HIDAYAT', '2000-10-30', 'sukoharjo', 'laki-laki'),
('L200200080', 'ANDIKA NUR RIFAI', '2000-10-30', 'karanganyar', 'laki-laki'),
('L200200081', 'WINDU BAKHTIAR RAHMAN', '2000-10-30', 'karanganyar', 'laki-laki'),
('L200200082', 'DIMAS RAHMAT DARMAWAN', '2000-10-30', 'sragen', 'laki-laki'),
('L200200083', 'DINNY PATRIA MUSLIMAWATI', '2000-10-30', 'sragen', 'perempuan'),
('L200200084', 'WIDYASMARA AFIF NUR RAHMA', '2000-10-30', 'solo', 'laki-laki'),
('L200200085', 'FADHILAH KURNIA IHSAN', '2000-10-30', 'solo', 'laki-laki'),
('L200200086', 'SEPTIAN EKA SISWANTARA', '2000-10-30', 'boyolali', 'laki-laki'),
('L200200087', 'WAHYU WIDODO', '2000-10-30', 'boyolali', 'laki-laki'),
('L200200088', 'MUHAMMAD NAUFAL AJI SATRI', '2000-10-30', 'klaten', 'laki-laki'),
('L200200090', 'ALDILLA ULINNAJA', '2000-10-30', 'klaten', 'laki-laki'),
('L200200091', 'FADHIL MUHAMMAD NUR RAHMA', '2000-10-30', 'wonogiri', 'laki-laki'),
('L200200145', 'SIGIT WAHYUDI', '2000-10-30', 'wonogiri', 'laki-laki'),
('L200200146', 'ARSY MUHAMMAD IQBAL', '2000-10-30', 'sukoharjo', 'laki-laki'),
('L200200147', 'ISNAINI INTAN NUR KHISANA', '2000-10-30', 'sukoharjo', 'perempuan'),
('L200200148', 'FARHAN SRIADI', '2000-10-30', 'solo', 'laki-laki'),
('L200200149', 'MUHAMMAD AKMAL NAFIS', '2000-10-30', 'solo', 'laki-laki'),
('L200200150', 'ACNAN DINI NIKEN PUTRI DA', '2000-10-30', 'solo', 'laki-laki'),
('L200200151', 'MUHAMMAD IKHSAN FAHRUDIN', '2000-10-30', 'solo', 'laki-laki'),
('L200200153', 'KHOIRUR ROZIKIN', '2000-10-30', 'solo', 'laki-laki'),
('L200200154', 'MUHAMMAD ROSYID UWAYSH AL', '2000-10-30', 'solo', 'laki-laki'),
('L200200155', 'ARISKI TRY ANGGARA', '2000-10-30', 'solo', 'laki-laki'),
('L200200156', 'WIDHI SULISTYANINGTYAS SI', '2000-10-30', 'solo', 'perempuan'),
('L200200158', 'MARUF MUBAROQ', '2000-10-30', 'solo', 'laki-laki'),
('L200200160', 'FAUZAN IKHSANUDIN', '2000-10-30', 'solo', 'laki-laki'),
('L200200161', 'NILAM TRI ASTUTI', '2000-10-30', 'solo', 'perempuan'),
('L200200162', 'JOVAN TEGUH PRADANA', '2000-10-30', 'solo', 'laki-laki'),
('L200200163', 'AGUNG SETIAWAN', '2000-10-30', 'solo', 'laki-laki'),
('L200200165', 'MUHAMMAD IMADUDDIN MUSTOF', '2000-10-30', 'solo', 'laki-laki'),
('L200200166', 'NUR PHASYA ARYANTO', '2000-10-30', 'solo', 'laki-laki'),
('L200200168', 'DESTY FITRIAH MURTIWARI', '2000-10-30', 'solo', 'perempuan');

INSERT INTO mata_kuliah (kode_mk, nama_mk, sks) VALUES
('TIF10334', 'Algoritma dan Pemrog', 4),
('TIF10431', 'Praktikum Algoritma ', 1),
('TIF10533', 'Kalkulus', 3),
('TIF10633', 'Teknologi Informasi', 3),
('TIF10732', 'Kepemimpinan dan Kom', 2),
('TIF10833', 'Pemrograman Web Stat', 3),
('TIF20333', 'Sistem Informasi', 3),
('TIF20433', 'Sistem Digital', 3),
('TIF20531', 'Praktikum Sistem Dig', 1),
('TIF20633', 'Logika dan Himpunan', 3),
('TIF20733', 'Aljabar Linier dan M', 3),
('TIF20833', 'Pemrograman Visual', 3),
('TIF30233', 'Sistem Operasi', 3),
('TIF30331', 'Praktikum Sistem Ope', 1),
('TIF30433', 'Metode Numerik', 3),
('TIF30533', 'Pemrograman Berorien', 3),
('TIF30631', 'Praktikum Pemrograma', 1),
('TIF30733', 'Matematika Diskret', 3),
('TIF30833', 'Komunikasi Data', 3),
('TIF40334', 'Algoritma dan Strukt', 4),
('TIF40431', 'Praktikum Algoritma ', 1),
('TIF40533', 'Sistem Basis Data', 3),
('TIF40631', 'Praktikum Sistem Bas', 1),
('TIF40733', 'Jaringan Komputer', 3),
('TIF40831', 'Praktikum Jaringan K', 1),
('TIF40933', 'Rekayasa Perangkat L', 3),
('UMS10112', 'Agama', 2),
('UMS10212', 'English for Academic', 2),
('UMS20112', 'Ibadah dan Muamalah', 2),
('UMS20212', 'Standardized Test Pr', 2),
('UMS30112', 'Islam dan IPTEKS', 3),
('UMS40112', 'Bahasa Indonesia', 2),
('UMS40212', 'Kemuhammadiyahan', 2);

-- 2. READ DATA --
SELECT * FROM mahasiswa;
SELECT * FROM mahasiswa WHERE alamat LIKE 'sol%';

-- 2. UPDATE DATA --
UPDATE mahasiswa SET alamat='mars' WHERE nama_mhs LIKE 'MUHAMMAD NAU%';

-- 2. DELETE DATA --
DELETE FROM mahasiswa WHERE nama_mhs LIKE 'ANDIKA%';
