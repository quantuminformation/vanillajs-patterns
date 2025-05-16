// File: wgsl/spinning-cube.wgsl

struct Uniforms {
  mvpMatrix : mat4x4<f32>,
}

@group(0) @binding(0)
var<uniform> uniforms : Uniforms;

struct VertexInput {
  @location(0) position : vec3<f32>,
  @location(1) color    : vec3<f32>,
}

struct VertexOutput {
  @builtin(position) Position  : vec4<f32>,
  @location(0)        fragColor : vec3<f32>,
}

@vertex
fn vs_main(input : VertexInput) -> VertexOutput {
  var out : VertexOutput;
  out.Position  = uniforms.mvpMatrix * vec4<f32>(input.position, 1.0);
  out.fragColor = input.color;
  return out;
}

@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4<f32> {
  return vec4<f32>(in.fragColor, 1.0);
}
