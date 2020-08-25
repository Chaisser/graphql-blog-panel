import React, { useState, Fragment } from "react";
import ReactPlayer from "react-player";
import { TwitterTweetEmbed } from "react-twitter-embed";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ErrorContainer from "./../ui/ErrorContainer";
import { GoTextSize, GoFileMedia, GoPlay } from "react-icons/go";
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram } from "react-icons/ai";
import { IoMdMap, IoIosCodeWorking } from "react-icons/io";
import { BiCarousel, BiGridAlt, BiImage } from "react-icons/bi";
import GoogleMap from "./../helpers/GoogleMap";
import AceEditor from "react-ace";
import PhotoUpload from "./../common/PhotoUpload";
import { Link } from "react-router-dom";
import InstagramEmbed from "react-instagram-embed";

import "ace-builds/src-noconflict/mode-jsx";
require(`ace-builds/src-noconflict/theme-monokai`);
const contentTypeOptions = [
  {
    id: "TEXT",
    title: "Yazı",
    icon: <GoTextSize />,
  },
  {
    id: "IMAGE",
    title: "Görsel",
    icon: <GoFileMedia />,
  },
  {
    id: "VIDEO",
    title: "Video",
    icon: <GoPlay />,
  },
  {
    id: "TWITTER",
    title: "Tweet",
    icon: <AiFillTwitterSquare />,
  },
  {
    id: "FACEBOOK",
    title: "Facebook",
    icon: <AiFillFacebook />,
  },
  {
    id: "INSTAGRAM",
    title: "instagram",
    icon: <AiFillInstagram />,
  },
  {
    id: "MAP",
    title: "Harita",
    icon: <IoMdMap />,
  },
  {
    id: "CODE",
    title: "Kod",
    icon: <IoIosCodeWorking />,
  },
];

const codeTypeOptions = [
  {
    id: "CSHARP",
    ace: "csharp",
    title: "C#",
  },
  {
    id: "CSS",
    ace: "css",
    title: "Css",
  },
  {
    id: "HTML",
    ace: "html",
    title: "Html",
  },
  {
    id: "JAVA",
    ace: "java",
    title: "Java",
  },
  {
    id: "JAVASCRIPT",
    ace: "javascript",
    title: "JavaScript",
  },
  {
    id: "JSON",
    ace: "json",
    title: "Json",
  },
  {
    id: "MARKDOWN",
    ace: "markdown",
    title: "Markdown",
  },
  {
    id: "PYTHON",
    ace: "python",
    title: "Python",
  },

  {
    id: "TYPESCRIPT",
    ace: "typescript",
    title: "TypeScript",
  },
  {
    id: "XML",
    ace: "xml",
    title: "Xml",
  },
];

codeTypeOptions.map((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang.ace}`);
  require(`ace-builds/src-noconflict/snippets/${lang.ace}`);
});

export default (props) => {
  const [error, setError] = useState("");

  const [title, setTitle] = useState(props.data ? (props.data.title ? props.data.title : "") : "");
  const [description, setDescription] = useState(props.data ? props.data.description : "");
  const [latitude, setLatitude] = useState(props.data ? (props.data.latitude ? props.data.latitude : 41) : 41);
  const [longitude, setLongitude] = useState(props.data ? (props.data.longitude ? props.data.longitude : 29) : 29);
  const [video, setVideo] = useState(props.data ? (props.data.video ? props.data.video : "") : "");
  const [embedCode, setEmbedCode] = useState(props.data ? (props.data.embedCode ? props.data.embedCode : "") : "");
  const [twitterEmbedText, setTwitterEmbedText] = useState("");
  const [instagramEmbedText, setInstagramEmbedText] = useState("");
  const [mediaType, setMediaType] = useState(props.data ? props.data.mediaType : "SINGLE");
  const [codeType, setCodeType] = useState(props.data ? props.data.codeType : "JAVASCRIPT");
  const [contentType, setContentType] = useState(props.data ? props.data.contentType : "");
  const [soruce, setSoruce] = useState(props.data ? (props.data.soruce ? props.data.soruce : "") : "");
  const [photosArray, setPhotosArray] = useState([]);

  const handleInstagramEmbed = (instagramEmbedCode) => {
    setInstagramEmbedText(instagramEmbedCode);
    const regexp = /permalink="(https:\/\/www.instagram\.com\/p\/.*?)\?/gim;
    const str = instagramEmbedCode.toString();

    const result = regexp.exec(str);

    if (!result) {
      return setError(<ErrorContainer title="Instagram Embed kodu geçerli değil." />);
    }

    if (result.length === 2) {
      return setEmbedCode(result[1]);
    }

    setEmbedCode("");

    return setError(<ErrorContainer title="Twitter Embed kodu geçerli değil." />);
  };
  const handleTwitterEmbed = (twitterEmbedCode) => {
    setTwitterEmbedText(twitterEmbedCode);
    const regexp = /https:\/\/twitter\.com\/(.*?)\/status\/(.*?)\?/gim;
    const str = twitterEmbedCode.toString();

    const result = regexp.exec(str);

    if (!result) {
      return setError(<ErrorContainer title="Twitter Embed kodu geçerli değil." />);
    }

    if (result.length === 3) {
      return setEmbedCode(result[2]);
    }

    setEmbedCode("");

    return setError(<ErrorContainer title="Twitter Embed kodu geçerli değil." />);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    const sendData = {
      title,
      description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      video,
      embedCode,
      mediaType,
      codeType,
      contentType,
      soruce,
      photos: photosArray,
    };

    return props.handleSubmit(sendData);
  };

  return (
    <form onSubmit={onSubmit} className="w-full bg-white p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-3">{props.title}</h1>
        <span className="text-right">
          <Link to={`/contents/${props.postId}`}>Geri Dön</Link>
        </span>
      </div>
      {error && error}

      <div className="grid grid-cols-8 gap-4">
        {contentTypeOptions.map((ct) => {
          return (
            <button key={ct.id} type="button" className="outline-none rounded-sm" onClick={() => setContentType(ct.id)}>
              <div
                className={`p-3  ${
                  contentType === ct.id ? "bg-green-300" : "bg-gray-200"
                } flex flex-col justify-center items-center outline-none border-none `}
              >
                <span className="text-3xl mb-2 text-blue-600 mt-2">{ct.icon}</span>
                <span className="font-bold text-gray-700">{ct.title}</span>
              </div>
            </button>
          );
        })}
      </div>

      {contentType && (
        <Fragment>
          <div className="flex flex-wrap  mb-3 mt-5">
            <div className="w-full md:w-1/2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Başlık</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Başlık"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          {contentType === "IMAGE" && (
            <Fragment>
              <div className="block mb-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Görseller</label>
                <PhotoUpload
                  isSingle={false}
                  images={props.data && props.data.photos}
                  imageArray={photosArray}
                  setImageArray={setPhotosArray}
                />
              </div>

              <div className="block mb-3">
                <div className="w-full md:w-1/3">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <button
                        type="button"
                        onClick={() => setMediaType("SINGLE")}
                        className={`${
                          mediaType === "SINGLE" ? "bg-green-300" : "bg-gray-200"
                        } p-5 text-center w-full flex flex-col items-center justify-center`}
                      >
                        <BiImage className="text-3xl" />
                        <span className="mt-2 text-sm">SINGLE</span>
                      </button>
                    </div>
                    <div className="flex-1">
                      <button
                        type="button"
                        onClick={() => setMediaType("GALLERY")}
                        className={`${
                          mediaType === "GALLERY" ? "bg-green-300" : "bg-gray-200"
                        } p-5 text-center w-full flex flex-col items-center justify-center`}
                      >
                        <BiCarousel className="text-3xl" />
                        <span className="mt-2 text-sm">GALLERY</span>
                      </button>
                    </div>
                    <div className="flex-1">
                      <button
                        type="button"
                        onClick={() => setMediaType("THUMBS")}
                        className={`${
                          mediaType === "THUMBS" ? "bg-green-300" : "bg-gray-200"
                        } p-5 text-center w-full flex flex-col items-center justify-center`}
                      >
                        <BiGridAlt className="text-3xl" />
                        <span className="mt-2 text-sm">THUMBS</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          {contentType === "VIDEO" && (
            <Fragment>
              <div className="flex flex-wrap  mb-3">
                <div className="w-full md:w-1/2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Video Adresi
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Video Adresi"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                  />
                </div>
              </div>
              {video && (
                <div className="mb-4">
                  <div className="text-sm mb-3">Video Önizleme</div>
                  <ReactPlayer
                    url={video}
                    onReady={(err) => setError("")}
                    onError={(err) => setError(<ErrorContainer title="Geçerli video girilmesi gereklidir." />)}
                  />
                </div>
              )}
            </Fragment>
          )}

          {contentType === "INSTAGRAM" && (
            <Fragment>
              <div className="flex flex-wrap  mb-3 mt-5">
                <div className="w-full md:w-1/2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Instagram
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Embed Kodu"
                    value={instagramEmbedText}
                    onChange={(e) => handleInstagramEmbed(e.target.value)}
                  />
                </div>
              </div>
              <div>
                {embedCode && (
                  <div>
                    <InstagramEmbed
                      url={embedCode}
                      maxWidth={320}
                      hideCaption={true}
                      containerTagName="div"
                      protocol=""
                      injectScript
                    />
                  </div>
                )}
              </div>
            </Fragment>
          )}

          {contentType === "TWITTER" && (
            <Fragment>
              <div className="flex flex-wrap  mb-3 mt-5">
                <div className="w-full md:w-1/2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Twitter</label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Embed Kodu"
                    value={twitterEmbedText}
                    onChange={(e) => handleTwitterEmbed(e.target.value)}
                  />
                </div>
              </div>
              <div>
                {embedCode && (
                  <div>
                    <TwitterTweetEmbed tweetId={embedCode} />
                  </div>
                )}
              </div>
            </Fragment>
          )}

          {contentType === "MAP" && (
            <Fragment>
              <GoogleMap
                addMarker={true}
                latitude={latitude}
                setLatitude={setLatitude}
                draggable={true}
                longitude={longitude}
                setLongitude={setLongitude}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ minHeight: `400px` }} />}
                mapElement={<div className="block w-full h-full" style={{ minWidth: "100%", height: "400px" }} />}
              />
            </Fragment>
          )}
          {contentType === "CODE" && (
            <Fragment>
              <div className="flex flex-wrap  mb-3 mt-5">
                <div className="w-full md:w-1/2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Programlama Dili
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="codeType"
                      value={codeType}
                      onChange={(e) => setCodeType(e.target.value)}
                    >
                      {codeTypeOptions.map((cd) => {
                        return (
                          <option key={cd.id} value={cd.id}>
                            {cd.title}
                          </option>
                        );
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap  mb-3">
                <div className="w-full">
                  <AceEditor
                    className="w-full block"
                    placeholder="Kodunuzu yazmaya başlayabilirsiniz"
                    mode={codeType.toLowerCase()}
                    theme="monokai"
                    name="codeEditor"
                    onChange={(e) => setSoruce(e)}
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={true}
                    width={"100%"}
                    highlightActiveLine={true}
                    value={soruce}
                  />
                </div>
              </div>
            </Fragment>
          )}

          <div className="flex flex-wrap  mb-3">
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Açıklama</label>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
            </div>
          </div>

          <div className="flex">
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Kaydet
            </button>
          </div>
        </Fragment>
      )}
    </form>
  );
};
