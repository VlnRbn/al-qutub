import {
  __commonJS
} from "./chunk-76J2PTFD.js";

// node_modules/iota-array/iota.js
var require_iota = __commonJS({
  "node_modules/iota-array/iota.js"(exports, module) {
    "use strict";
    function iota(n) {
      var result = new Array(n);
      for (var i = 0; i < n; ++i) {
        result[i] = i;
      }
      return result;
    }
    module.exports = iota;
  }
});

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/is-buffer/index.js"(exports, module) {
    module.exports = function(obj) {
      return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
    };
    function isBuffer(obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    }
    function isSlowBuffer(obj) {
      return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
    }
  }
});

// node_modules/ndarray/ndarray.js
var require_ndarray = __commonJS({
  "node_modules/ndarray/ndarray.js"(exports, module) {
    var iota = require_iota();
    var isBuffer = require_is_buffer();
    var hasTypedArrays = typeof Float64Array !== "undefined";
    function compare1st(a, b) {
      return a[0] - b[0];
    }
    function order() {
      var stride = this.stride;
      var terms = new Array(stride.length);
      var i;
      for (i = 0; i < terms.length; ++i) {
        terms[i] = [Math.abs(stride[i]), i];
      }
      terms.sort(compare1st);
      var result = new Array(terms.length);
      for (i = 0; i < result.length; ++i) {
        result[i] = terms[i][1];
      }
      return result;
    }
    function compileConstructor(dtype, dimension) {
      var className = ["View", dimension, "d", dtype].join("");
      if (dimension < 0) {
        className = "View_Nil" + dtype;
      }
      var useGetters = dtype === "generic";
      if (dimension === -1) {
        var code = "function " + className + "(a){this.data=a;};var proto=" + className + ".prototype;proto.dtype='" + dtype + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + className + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + className + "(a){return new " + className + "(a);}";
        var procedure = new Function(code);
        return procedure();
      } else if (dimension === 0) {
        var code = "function " + className + "(a,d) {this.data = a;this.offset = d};var proto=" + className + ".prototype;proto.dtype='" + dtype + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + className + "_copy() {return new " + className + "(this.data,this.offset)};proto.pick=function " + className + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + className + "_get(){return " + (useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + className + "_set(v){return " + (useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + className + "(a,b,c,d){return new " + className + "(a,d)}";
        var procedure = new Function("TrivialArray", code);
        return procedure(CACHED_CONSTRUCTORS[dtype][0]);
      }
      var code = ["'use strict'"];
      var indices = iota(dimension);
      var args = indices.map(function(i2) {
        return "i" + i2;
      });
      var index_str = "this.offset+" + indices.map(function(i2) {
        return "this.stride[" + i2 + "]*i" + i2;
      }).join("+");
      var shapeArg = indices.map(function(i2) {
        return "b" + i2;
      }).join(",");
      var strideArg = indices.map(function(i2) {
        return "c" + i2;
      }).join(",");
      code.push(
        "function " + className + "(a," + shapeArg + "," + strideArg + ",d){this.data=a",
        "this.shape=[" + shapeArg + "]",
        "this.stride=[" + strideArg + "]",
        "this.offset=d|0}",
        "var proto=" + className + ".prototype",
        "proto.dtype='" + dtype + "'",
        "proto.dimension=" + dimension
      );
      code.push(
        "Object.defineProperty(proto,'size',{get:function " + className + "_size(){return " + indices.map(function(i2) {
          return "this.shape[" + i2 + "]";
        }).join("*"),
        "}})"
      );
      if (dimension === 1) {
        code.push("proto.order=[0]");
      } else {
        code.push("Object.defineProperty(proto,'order',{get:");
        if (dimension < 4) {
          code.push("function " + className + "_order(){");
          if (dimension === 2) {
            code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})");
          } else if (dimension === 3) {
            code.push(
              "var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})"
            );
          }
        } else {
          code.push("ORDER})");
        }
      }
      code.push(
        "proto.set=function " + className + "_set(" + args.join(",") + ",v){"
      );
      if (useGetters) {
        code.push("return this.data.set(" + index_str + ",v)}");
      } else {
        code.push("return this.data[" + index_str + "]=v}");
      }
      code.push("proto.get=function " + className + "_get(" + args.join(",") + "){");
      if (useGetters) {
        code.push("return this.data.get(" + index_str + ")}");
      } else {
        code.push("return this.data[" + index_str + "]}");
      }
      code.push(
        "proto.index=function " + className + "_index(",
        args.join(),
        "){return " + index_str + "}"
      );
      code.push("proto.hi=function " + className + "_hi(" + args.join(",") + "){return new " + className + "(this.data," + indices.map(function(i2) {
        return ["(typeof i", i2, "!=='number'||i", i2, "<0)?this.shape[", i2, "]:i", i2, "|0"].join("");
      }).join(",") + "," + indices.map(function(i2) {
        return "this.stride[" + i2 + "]";
      }).join(",") + ",this.offset)}");
      var a_vars = indices.map(function(i2) {
        return "a" + i2 + "=this.shape[" + i2 + "]";
      });
      var c_vars = indices.map(function(i2) {
        return "c" + i2 + "=this.stride[" + i2 + "]";
      });
      code.push("proto.lo=function " + className + "_lo(" + args.join(",") + "){var b=this.offset,d=0," + a_vars.join(",") + "," + c_vars.join(","));
      for (var i = 0; i < dimension; ++i) {
        code.push(
          "if(typeof i" + i + "==='number'&&i" + i + ">=0){d=i" + i + "|0;b+=c" + i + "*d;a" + i + "-=d}"
        );
      }
      code.push("return new " + className + "(this.data," + indices.map(function(i2) {
        return "a" + i2;
      }).join(",") + "," + indices.map(function(i2) {
        return "c" + i2;
      }).join(",") + ",b)}");
      code.push("proto.step=function " + className + "_step(" + args.join(",") + "){var " + indices.map(function(i2) {
        return "a" + i2 + "=this.shape[" + i2 + "]";
      }).join(",") + "," + indices.map(function(i2) {
        return "b" + i2 + "=this.stride[" + i2 + "]";
      }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
      for (var i = 0; i < dimension; ++i) {
        code.push(
          "if(typeof i" + i + "==='number'){d=i" + i + "|0;if(d<0){c+=b" + i + "*(a" + i + "-1);a" + i + "=ceil(-a" + i + "/d)}else{a" + i + "=ceil(a" + i + "/d)}b" + i + "*=d}"
        );
      }
      code.push("return new " + className + "(this.data," + indices.map(function(i2) {
        return "a" + i2;
      }).join(",") + "," + indices.map(function(i2) {
        return "b" + i2;
      }).join(",") + ",c)}");
      var tShape = new Array(dimension);
      var tStride = new Array(dimension);
      for (var i = 0; i < dimension; ++i) {
        tShape[i] = "a[i" + i + "]";
        tStride[i] = "b[i" + i + "]";
      }
      code.push(
        "proto.transpose=function " + className + "_transpose(" + args + "){" + args.map(function(n, idx) {
          return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)";
        }).join(";"),
        "var a=this.shape,b=this.stride;return new " + className + "(this.data," + tShape.join(",") + "," + tStride.join(",") + ",this.offset)}"
      );
      code.push("proto.pick=function " + className + "_pick(" + args + "){var a=[],b=[],c=this.offset");
      for (var i = 0; i < dimension; ++i) {
        code.push("if(typeof i" + i + "==='number'&&i" + i + ">=0){c=(c+this.stride[" + i + "]*i" + i + ")|0}else{a.push(this.shape[" + i + "]);b.push(this.stride[" + i + "])}");
      }
      code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}");
      code.push("return function construct_" + className + "(data,shape,stride,offset){return new " + className + "(data," + indices.map(function(i2) {
        return "shape[" + i2 + "]";
      }).join(",") + "," + indices.map(function(i2) {
        return "stride[" + i2 + "]";
      }).join(",") + ",offset)}");
      var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"));
      return procedure(CACHED_CONSTRUCTORS[dtype], order);
    }
    function arrayDType(data) {
      if (isBuffer(data)) {
        return "buffer";
      }
      if (hasTypedArrays) {
        switch (Object.prototype.toString.call(data)) {
          case "[object Float64Array]":
            return "float64";
          case "[object Float32Array]":
            return "float32";
          case "[object Int8Array]":
            return "int8";
          case "[object Int16Array]":
            return "int16";
          case "[object Int32Array]":
            return "int32";
          case "[object Uint8Array]":
            return "uint8";
          case "[object Uint16Array]":
            return "uint16";
          case "[object Uint32Array]":
            return "uint32";
          case "[object Uint8ClampedArray]":
            return "uint8_clamped";
          case "[object BigInt64Array]":
            return "bigint64";
          case "[object BigUint64Array]":
            return "biguint64";
        }
      }
      if (Array.isArray(data)) {
        return "array";
      }
      return "generic";
    }
    var CACHED_CONSTRUCTORS = {
      "float32": [],
      "float64": [],
      "int8": [],
      "int16": [],
      "int32": [],
      "uint8": [],
      "uint16": [],
      "uint32": [],
      "array": [],
      "uint8_clamped": [],
      "bigint64": [],
      "biguint64": [],
      "buffer": [],
      "generic": []
    };
    function wrappedNDArrayCtor(data, shape, stride, offset) {
      if (data === void 0) {
        var ctor = CACHED_CONSTRUCTORS.array[0];
        return ctor([]);
      } else if (typeof data === "number") {
        data = [data];
      }
      if (shape === void 0) {
        shape = [data.length];
      }
      var d = shape.length;
      if (stride === void 0) {
        stride = new Array(d);
        for (var i = d - 1, sz = 1; i >= 0; --i) {
          stride[i] = sz;
          sz *= shape[i];
        }
      }
      if (offset === void 0) {
        offset = 0;
        for (var i = 0; i < d; ++i) {
          if (stride[i] < 0) {
            offset -= (shape[i] - 1) * stride[i];
          }
        }
      }
      var dtype = arrayDType(data);
      var ctor_list = CACHED_CONSTRUCTORS[dtype];
      while (ctor_list.length <= d + 1) {
        ctor_list.push(compileConstructor(dtype, ctor_list.length - 1));
      }
      var ctor = ctor_list[d + 1];
      return ctor(data, shape, stride, offset);
    }
    module.exports = wrappedNDArrayCtor;
  }
});
export default require_ndarray();
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
//# sourceMappingURL=ndarray.js.map
