(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __moduleCache = /* @__PURE__ */ new WeakMap;
  var __toCommonJS = (from) => {
    var entry = __moduleCache.get(from), desc;
    if (entry)
      return entry;
    entry = __defProp({}, "__esModule", { value: true });
    if (from && typeof from === "object" || typeof from === "function")
      __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      }));
    __moduleCache.set(from, entry);
    return entry;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {
        get: all[name],
        enumerable: true,
        configurable: true,
        set: (newValue) => all[name] = () => newValue
      });
  };

  // src/appz.ts
  var exports_appz = {};
  __export(exports_appz, {
    getAppzChannel: () => getAppzChannel,
    applySegmentLayerStyles: () => applySegmentLayerStyles,
    HardwareBridge: () => HardwareBridge,
    AppzNavigator: () => AppzNavigator,
    AppzEngine: () => AppzEngine,
    AppzChan: () => AppzChan,
    Appz: () => Appz
  });

  class AppzChan {
    listeners = new Set;
    send(val) {
      this.listeners.forEach((cb) => {
        try {
          cb(val);
        } catch (e) {
          console.error(`[AppzChan]`, e);
        }
      });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("appz:channel", { detail: val }));
      }
    }
    recv(cb) {
      this.listeners.add(cb);
      return () => this.listeners.delete(cb);
    }
    close() {
      this.listeners.clear();
    }
  }
  var activeChannels = new Map;
  function getAppzChannel(name) {
    if (!activeChannels.has(name)) {
      activeChannels.set(name, new AppzChan);
    }
    return activeChannels.get(name);
  }
  var HardwareBridge = {
    haptic(type = "light") {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        switch (type) {
          case "light":
            navigator.vibrate(10);
            break;
          case "medium":
            navigator.vibrate(25);
            break;
          case "heavy":
            navigator.vibrate(50);
            break;
          case "selection":
            navigator.vibrate(5);
            break;
          case "success":
            navigator.vibrate([15, 30, 15]);
            break;
          case "warning":
            navigator.vibrate([30, 50, 30]);
            break;
          case "error":
            navigator.vibrate([50, 100, 50]);
            break;
        }
      }
    },
    async requestWakeLock() {
      if (typeof navigator !== "undefined" && "wakeLock" in navigator) {
        try {
          await navigator.wakeLock.request("screen");
          return true;
        } catch (e) {
          return false;
        }
      }
      return false;
    }
  };
  var AppzNavigator = {
    history: [],
    push(url, transition = "slide-left") {
      HardwareBridge.haptic("selection");
      this.history.push(url);
      if (typeof window !== "undefined" && window.htmx) {
        return window.htmx.ajax("GET", url, {
          target: "app-shellui",
          swap: "innerHTML transition:true"
        });
      }
      return Promise.resolve();
    },
    pop() {
      if (this.history.length <= 1)
        return false;
      HardwareBridge.haptic("light");
      this.history.pop();
      const prevUrl = this.history[this.history.length - 1];
      if (typeof window !== "undefined" && window.htmx) {
        window.htmx.ajax("GET", prevUrl, {
          target: "app-shellui",
          swap: "innerHTML transition:true"
        });
      }
      return true;
    },
    showSheet(sheetId, snapPoints = [0.35, 0.85]) {
      HardwareBridge.haptic("medium");
      const sheet = document.querySelector(sheetId);
      if (!sheet)
        return;
      sheet.classList.remove("hidden");
      sheet.style.transform = `translateY(0%)`;
    },
    hideSheet(sheetId) {
      HardwareBridge.haptic("light");
      const sheet = document.querySelector(sheetId);
      if (!sheet)
        return;
      sheet.style.transform = `translateY(100%)`;
      setTimeout(() => sheet.classList.add("hidden"), 250);
    }
  };
  function applySegmentLayerStyles(el) {
    const levelAttr = el.getAttribute("level") || el.getAttribute("layer") || "0";
    const level = parseInt(levelAttr, 10);
    const clampedLevel = Math.max(0, Math.min(9, isNaN(level) ? 0 : level));
    el.style.position = "relative";
    el.style.zIndex = String(clampedLevel * 10);
    el.setAttribute("data-resolved-layer", String(clampedLevel));
  }

  class AppzEngine {
    init(root = document) {
      root.querySelectorAll("app-layer, [app-layer], [layer]").forEach((el) => {
        applySegmentLayerStyles(el);
      });
      root.querySelectorAll("[hx-pull-refresh], [app-pull-refresh]").forEach((el) => {
        this.bindPullToRefresh(el);
      });
      root.querySelectorAll("app-bottom-sheet, [app-bottom-sheet]").forEach((el) => {
        this.bindBottomSheet(el);
      });
      root.querySelectorAll("app-joystick, [app-joystick]").forEach((el) => {
        this.bindJoystick(el);
      });
    }
    bindPullToRefresh(el) {
      let startY = 0;
      let currentY = 0;
      const threshold = 70;
      const refreshUrl = el.getAttribute("hx-pull-refresh") || el.getAttribute("app-pull-refresh") || "";
      el.addEventListener("touchstart", (e) => {
        if (el.scrollTop === 0) {
          startY = e.touches[0].clientY;
        }
      }, { passive: true });
      el.addEventListener("touchmove", (e) => {
        if (startY === 0)
          return;
        currentY = e.touches[0].clientY;
        const pullDist = Math.max(0, currentY - startY);
        if (pullDist > 0 && pullDist < 120) {
          el.style.transform = `translateY(${pullDist * 0.4}px)`;
          if (pullDist > threshold)
            HardwareBridge.haptic("selection");
        }
      }, { passive: true });
      el.addEventListener("touchend", () => {
        const pullDist = Math.max(0, currentY - startY);
        startY = 0;
        currentY = 0;
        el.style.transform = "";
        if (pullDist >= threshold && refreshUrl && typeof window !== "undefined" && window.htmx) {
          HardwareBridge.haptic("success");
          window.htmx.ajax("GET", refreshUrl, { target: el, swap: "innerHTML" });
        }
      });
    }
    bindBottomSheet(el) {
      let startY = 0;
      el.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
      const handle = el.querySelector(".drag-handle") || el;
      handle.addEventListener("touchstart", (e) => {
        startY = e.touches[0].clientY;
      }, { passive: true });
      handle.addEventListener("touchmove", (e) => {
        const deltaY = e.touches[0].clientY - startY;
        if (deltaY > 0) {
          el.style.transform = `translateY(${deltaY}px)`;
        }
      }, { passive: true });
      handle.addEventListener("touchend", (e) => {
        const deltaY = (e.changedTouches ? e.changedTouches[0].clientY : 0) - startY;
        if (deltaY > 100) {
          AppzNavigator.hideSheet(`#${el.id}`);
        } else {
          el.style.transform = "translateY(0%)";
        }
      });
    }
    bindJoystick(el) {
      const channelName = el.getAttribute("hx-chan-send") || "game:joystick";
      const ch = getAppzChannel(channelName);
      let active = false;
      const handleMove = (x, y) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normX = Math.max(-1, Math.min(1, (x - centerX) / (rect.width / 2)));
        const normY = Math.max(-1, Math.min(1, (y - centerY) / (rect.height / 2)));
        ch.send({ x: normX, y: normY });
      };
      el.addEventListener("pointerdown", (e) => {
        active = true;
        handleMove(e.clientX, e.clientY);
      });
      window.addEventListener("pointermove", (e) => {
        if (active)
          handleMove(e.clientX, e.clientY);
      });
      window.addEventListener("pointerup", () => {
        if (active) {
          active = false;
          ch.send({ x: 0, y: 0 });
        }
      });
    }
  }
  var Appz = new AppzEngine;
  if (typeof window !== "undefined") {
    window.Appz = Appz;
    window.$appz = {
      navigator: AppzNavigator,
      push: AppzNavigator.push.bind(AppzNavigator),
      pop: AppzNavigator.pop.bind(AppzNavigator),
      sheet: AppzNavigator.showSheet.bind(AppzNavigator),
      sheetClose: AppzNavigator.hideSheet.bind(AppzNavigator),
      haptic: HardwareBridge.haptic.bind(HardwareBridge),
      chan: getAppzChannel,
      send(name, val) {
        getAppzChannel(name).send(val);
      },
      recv(name, cb) {
        return getAppzChannel(name).recv(cb);
      }
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => Appz.init());
    } else {
      Appz.init();
    }
  }
})();
