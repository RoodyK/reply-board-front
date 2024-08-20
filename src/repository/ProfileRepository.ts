import MemberProfile from "@/entity/member/MemberProfile";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { singleton } from "tsyringe";

@singleton()
export default class ProfileRepository {

  public setProfile(profile: MemberProfile) {
    const jsonObj = instanceToPlain(profile);
    localStorage.setItem("profile", JSON.stringify(jsonObj));
  }

  public getProfile() {
    const json = localStorage.getItem("profile");
    if (json != null) {
        const plain = JSON.parse(json);
        return plainToInstance(MemberProfile, plain);
    }
    return null;
  }


  public clear() {
    localStorage.clear();
  }

  private encodeToBase64(input: string): string {
    try {
      return btoa(input);
    } catch (e) {
      console.error("Failed to encode to Base64:", e);
      return "";
    }
  }

  private decodeFromBase64(input: string): string {
    try {
      return atob(input);
    } catch (e) {
      console.error("Failed to decode from Base64:", e);
      return "";
    }
  }
}