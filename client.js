const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('example.proto');
const helloWorldProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

const client = new helloWorldProto.Greeter(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

client.sayHello({ name: 'World' }, (error, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(response.message);
  }
});