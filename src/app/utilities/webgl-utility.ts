export class WebglUtility {

  public static verify(): boolean {
    if (window.WebGLRenderingContext) return true;
  
    return false;
  }

  public static create(): WebGLRenderingContext | WebGL2RenderingContext {
    if (this.verify() == false) return;
  
    let canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.innerHTML = 'This browser does not support HTML5';
  
    let gl: WebGLRenderingContext | WebGL2RenderingContext = canvas.getContext('webgl', { preserveDrawingBuffer: true });
  
    if (!gl) throw new Error('Could not get context, there was an unknown error.');
  
    return gl;
  }

  public static compileShader(gl: WebGLRenderingContext | WebGL2RenderingContext, shaderSource: string, shaderType: number): WebGLShader {
    var shader = gl.createShader(shaderType);
  
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
  
    if (!(gl.getShaderParameter(shader, gl.COMPILE_STATUS))) {
      gl.deleteShader(shader);
  
      throw 'Could not compile shader: ' + gl.getShaderInfoLog(shader);
    }
  
    return shader;
  }

  public static createProgram(
      gl: WebGLRenderingContext | WebGL2RenderingContext, 
      vertexShader: WebGLShader, 
      fragmentShader: WebGLShader): WebGLProgram {
    var program: WebGLProgram = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!(gl.getProgramParameter(program, gl.LINK_STATUS))) throw ('Program failed to link: ' + gl.getProgramInfoLog (program));

    return program;
  };

  public static resize(gl: WebGLRenderingContext | WebGL2RenderingContext, width: number, height: number): void {
    gl.canvas.width = width;
    gl.canvas.height = height;
  
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(1, 1, 1, 1);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

}
