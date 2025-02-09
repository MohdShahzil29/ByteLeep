import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        // int[] arr = {5, 3, 10, 7, 15};
        // int k = 18;
        int result = findPairIndex(arr, k);
        System.out.println(result);
    }

    public static int findPairIndex(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                // Return the index of the complement
                return map.get(complement);
            }
            // Store the index of the current element
            map.put(nums[i], i);
        }

        // If no pair is found, return -1
        return -1;
    }
}
