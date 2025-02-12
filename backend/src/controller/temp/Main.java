public class Main {
    public static void main(String[] args) {
        // Example input
        int[] arr = {5, 3, 10, 7, 15};
        int k = 18;

        int[] result = findPairIndex(arr, k);
        if (result != null) {
            System.out.println(result[0] + " " + result[1]);
        } else {
            System.out.println("No pair found");
        }
    }

    public static int[] findPairIndex(int[] arr, int target) {
        // Check every pair in order to guarantee the lexicographically smallest pair is found.
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[i] + arr[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return null; // Return null if no pair is found
    }
}
