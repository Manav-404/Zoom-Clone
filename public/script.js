let vidStream;
var peer = new Peer(undefined, {
	path: "/peerjs",
	host: "/",
	port: "3030",
});
const socket = io("/");
const vidGrid = document.getElementById("video-grid");
const vid = document.createElement("video");
vid.muted = true;

navigator.mediaDevices
	.getUserMedia({
		video: true,
		audio: true,
	})
	.then((stream) => {
		vidStream = stream;
		addVidStream(vid, vidStream);
	})
	.catch((err) => console.log(err));

peer.on("open", (id) => {
	socket.emit("join-room", ROOM_ID, id);
});

socket.emit("join-room", ROOM_ID);

socket.on("user-connected", (userId) => {
	connectToNewUser(userId);
});

const connectToNewUser = (userId) => {
	console.log(userId);
};

const addVidStream = (video, stream) => {
	video.srcObject = stream;
	video.addEventListener("loadedmetadata", () => {
		video.play();
	});

	vidGrid.append(video);
};
