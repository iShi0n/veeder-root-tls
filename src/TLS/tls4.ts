/* eslint-disable new-cap */
import PromiseSocket from 'promise-socket';
import net from 'net';

class Tls {
  ip: string;

  port: number;

  private promiseSocket?: PromiseSocket<net.Socket>;

  /**
   *
   * @param {string} ip IP do TLS
   * @param {number} port Porta do TLS (padrão 10001)
   */
  constructor(ip: string, port: number = 10001) {
    this.ip = ip;
    this.port = port;
  }

  async connect() {
    this.promiseSocket = new PromiseSocket(new net.Socket());

    try {
      await this.promiseSocket.connect({
        host: this.ip,
        port: this.port,
      });
      console.log(`Conectado a ${this.ip}:${this.port}.`);
    } catch (error: any) {
      console.error('Ocorreu um erro ao se conectar ao TLS4.', error.name);
      throw error;
    }
  }

  async getTanks() {
    const buffer = Buffer.concat([Buffer.from([0x1]), Buffer.from('i20100')]);

    await this.promiseSocket.write(buffer);
    await this.promiseSocket.end();

    const result = this.promiseSocket.readAll();

    return result;
  }
}

export default Tls;
