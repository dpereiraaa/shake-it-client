function Footer() {
  return (
    <div className="bg-red-100 flex justify-center w-full h-16 items-center">
      <p className="bg-red-100 flex justify-center items-center">
        Made by
        <a
          href="https://github.com/dpereiraaa"
          className="bg-red-100 flex justify-center ml-1 items-center"
        >
          David Pereira
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            width="25px"
            className="bg-red-100 ml-2 items-center"
          ></img>
        </a>
      </p>
    </div>
  );
}

export default Footer;
