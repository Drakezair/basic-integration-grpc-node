const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("service.proto");
const helloWorldProto =
  grpc.loadPackageDefinition(packageDefinition).helloworld;

function sayHello(call, callback) {
  callback(null, { ...call.request });
}

const server = new grpc.Server();
server.addService(helloWorldProto.Greeter.service, { sayHello });
server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
server.start();
